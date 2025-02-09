<script setup lang="ts">
import type { AnimeListItem } from '@/_types/_filePageItem'
import { ref } from 'vue'
import { downloadJSON } from '@/helpers/downloadContent'
import DownloadModal from './DownloadModal.vue'
import ModelComponent from './ModelComponent.vue'

const { data } = defineProps<{ data: AnimeListItem }>()
const showModal = ref(false)
const handleDownload = (name: string) => {
  downloadJSON(data, `${name}.json`)
  showModal.value = false
}

const openModal = () => {
  showModal.value = true
}
</script>
<template>
  <div
    @click="openModal"
    class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900"
  >
    <span class="h-44 w-full bg-neutral-100/30 relative isolate">
      <img
        v-if="data.coverImage.cover_image"
        :src="data.coverImage.cover_image"
        :alt="data.title"
        class="size-full object-cover object-center"
      />
      <span v-else class="size-full flex flex-col gap-1 items-center justify-center">
        <i class="pi pi-file text-3xl"></i>
        <b class="text-xs">{{ data.format }}</b>
      </span>
      <DownloadModal
        :file-name="`${data.title.split(' ').join('_')}-(json_data)`"
        :handle-download="handleDownload"
        :file="{
          type: 'content',
          thumbnail: data.coverImage.cover_image,
          contents: data,
        }"
      />
      <span class="absolute bg-neutral-900 p-2 top-0 right-0 block z-20 text-xs rounded-bl-md"
        >status: {{ data.status }}</span
      >
      <span class="absolute bg-neutral-900 p-2 bottom-0 left-0 block z-20 text-xs rounded-tr-md"
        >type: json</span
      >
    </span>

    <div class="w-full h-fit flex flex-col gap-2 px-1 pb-2">
      <b class="w-full line-clamp-2 text-sm sm:text-base text-center break-all">{{ data.title }}</b>
    </div>
  </div>

  <ModelComponent :is-open="showModal" @close="showModal = false">
    <div class="flex flex-col gap-4 p-4">
      <div class="w-full flex gap-2 items-center flex-col relative isolate pt-12 px-2">
        <span
          class="text-lg w-full h-24 bg-neutral-600 absolute top-0 z-0 border-2 rounded-md"
          :style="{
            borderColor: data.coverImage.cover_image_color
              ? data.coverImage.cover_image_color
              : '#171717',
          }"
        >
          <img
            v-if="data.coverImage.bannerImage"
            :src="data.coverImage.bannerImage"
            alt=""
            class="size-full object-cover object-center rounded-md"
          />
        </span>

        <div class="w-full">
          <span
            :style="{
              borderColor: data.coverImage.cover_image_color
                ? data.coverImage.cover_image_color
                : '#171717',
            }"
            class="block w-fit h-fit max-w-16 border-2 rounded-md float-left !mr-1 relative z-10"
          >
            <img
              v-if="data.coverImage.cover_image"
              :src="data.coverImage.cover_image"
              alt=""
              class="max-h-56 object-contain object-center rounded-md"
            />
            <span
              v-else
              class="size-full w-28 h-64 flex flex-col gap-1 items-center justify-center"
            >
              <i class="pi pi-file text-3xl"></i>
              <b class="text-xs">json</b>
            </span>
          </span>
          <h1 class="p-0 text-neutral-200 m-0 font-bold h-full pt-12 relative z-10">
            {{ data.title }}
          </h1>
        </div>

        <div class="w-full flex gap-2 !mt-4 flex-wrap">
          <span class="w-fit px-3 py-1 bg-neutral-600 rounded-full">
            {{ data.format }}
          </span>
          <span class="w-fit px-3 py-1 bg-neutral-600 rounded-full">
            {{ data.status }}
          </span>
          <span class="w-fit px-3 py-1 bg-neutral-600 rounded-full">
            {{ data.releaseDate }}
          </span>
          <span class="w-fit px-3 py-1 bg-neutral-600 rounded-full">
            <i :class="`pi pi-thumbs-${data.averageScore > 60 ? 'up' : 'down'}-fill`"></i>
          </span>
        </div>
        <div class="w-full flex items-center justify-center gap-2 !mt-4">
          <button class="w-full p-2 bg-neutral-600 rounded-md" @click="showModal = false">
            cancel
          </button>
          <a
            :href="`https://anikii.vercel.app/anime/${data.id}`"
            class="w-full block p-2 bg-black text-center rounded-md"
            >View</a
          >
        </div>
      </div>
    </div>
  </ModelComponent>
</template>
