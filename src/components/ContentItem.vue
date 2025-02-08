<script setup lang="ts">
import type { AnimeListItem } from '@/_types/_filePageItem'
import { ref } from 'vue'
import ModelComponent from './ModelComponent.vue'
import { downloadJSON } from '@/helpers/downloadContent'

const { data } = defineProps<{ data: AnimeListItem }>()
const showModal = ref(false)
const modalName = ref(`${data.title.split(' ').join('_')}-(json_data)`)
const handleDownload = () => {
  downloadJSON(data, `${modalName.value}.json`)
  showModal.value = false
}
</script>
<template>
  <div class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900">
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
      <i
        @click="showModal = true"
        class="pi pi-download absolute bg-neutral-900 p-2 bottom-0 right-0 block z-20 text-xs rounded-tl-md"
      ></i>
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
      <div class="w-full flex gap-2 items-center flex-col">
        <span class="text-lg">Download the json data of this content</span>

        <span class="block w-fit h-fit max-w-full">
          <img
            :src="data.coverImage.cover_image"
            alt=""
            class="max-h-56 object-contain object-center rounded-md"
          />
        </span>
      </div>
      <label for="name" class="flex flex-col gap-2">
        <span class="text-lg">Save as:</span>
        <input
          type="text"
          id="name"
          class="w-full p-2 border-2 border-neutral-500 rounded-md"
          v-model="modalName"
        />
      </label>

      <div class="w-full flex gap-3 items-center justify-center *:cursor-pointer">
        <button class="w-full p-2 bg-neutral-600 rounded-md" @click="showModal = false">
          cancel
        </button>
        <button @click="handleDownload" class="w-full p-2 bg-black rounded-md">Save</button>
      </div>
    </div>
  </ModelComponent>
</template>
