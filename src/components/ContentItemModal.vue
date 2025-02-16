<script setup lang="ts">
import type { AnimeListItem } from '@/_types/_filePageItem'
import ModelComponent from './ModelComponent.vue'

const { data, setShowModal, showModal } = defineProps<{
  showModal: boolean
  setShowModal: (val: boolean) => void
  data: AnimeListItem
}>()
</script>
<template>
  <ModelComponent :is-open="showModal" @close="setShowModal(false)">
    <div class="flex flex-col gap-4 p-4 w-screen max-w-full">
      <div class="w-full flex gap-2 items-center flex-col relative isolate pt-32 px-2">
        <span
          class="text-lg w-full h-44 bg-neutral-600 absolute top-0 z-0 border-2 rounded-md"
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
            class="block w-fit h-fit border-neutral-900 border-8 rounded-lg float-left !mr-1 relative z-10"
          >
            <span
              :style="{
                borderColor: data.coverImage.cover_image_color
                  ? data.coverImage.cover_image_color
                  : '#171717',
              }"
              class="block w-fit h-fit max-w-[5rem] border-2"
            >
              <img
                v-if="data.coverImage.cover_image"
                :src="data.coverImage.cover_image"
                alt=""
                class="object-contain object-center"
              />
              <span
                v-else
                class="size-full w-28 h-64 flex flex-col gap-1 items-center justify-center"
              >
                <i class="pi pi-file text-3xl"></i>
                <b class="text-xs">json</b>
              </span>
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
          <button class="w-full p-2 bg-neutral-600 rounded-md" @click="setShowModal(false)">
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
