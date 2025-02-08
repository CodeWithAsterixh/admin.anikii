<script setup lang="ts">
import type { AnimeListItem } from '@/_types/_filePageItem'
import { downloadJSON } from '@/helpers/downloadContent'
import { useFilesStore } from '@/store'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ModelComponent from './ModelComponent.vue'

const { setCurrentlyViewed } = useFilesStore()
const { data, fileName, link } = defineProps<{
  data?: AnimeListItem[]
  fileName?: string
  link?: string
}>()
const showModal = ref(false)
const modalName = ref(fileName)
const handleDownload = async () => {
  if (data) {
    downloadJSON(data, `${modalName.value}.json`)
    showModal.value = false
  }
}
</script>
<template>
  <RouterLink
    :to="`${link}`"
    @click="setCurrentlyViewed(data)"
    class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900"
  >
    <span class="h-44 w-full bg-neutral-100/30 relative isolate">
      <img
        v-if="data && data[0].coverImage.cover_image"
        :src="data[0].coverImage.cover_image"
        :alt="fileName"
        class="size-full object-cover object-center"
      />
      <span v-else class="size-full flex flex-col gap-1 items-center justify-center">
        <i class="pi pi-file text-3xl"></i>
        <b class="text-xs">content</b>
      </span>
      <i
        @click.stop.prevent="showModal = true"
        class="pi pi-download absolute bg-neutral-900 p-2 bottom-0 right-0 block z-20 text-xs rounded-tl-md"
      ></i>
      <span class="absolute bg-neutral-900 p-2 top-0 right-0 block z-20 text-xs rounded-bl-md"
        >contents: {{ data?.length }}</span
      >
    </span>

    <div class="w-full h-fit flex flex-col gap-2 px-1 pb-2">
      <b class="w-full line-clamp-2 text-sm sm:text-base text-center break-all">{{ fileName }}</b>
    </div>
  </RouterLink>

  <ModelComponent :is-open="showModal" @close="showModal = false">
    <div class="flex flex-col gap-4 p-4">
      <div class="w-full flex gap-2 items-center flex-col">
        <span class="text-lg">Download the json data of this content</span>

        <span class="block w-fit h-fit max-w-full">
          <img
            v-if="data && data[0].coverImage.cover_image"
            :src="data[0].coverImage.cover_image"
            alt=""
            class="max-h-56 object-contain object-center rounded-md"
          />
          <span v-else class="size-full w-28 h-64 flex flex-col gap-1 items-center justify-center">
            <i class="pi pi-file text-3xl"></i>
            <b class="text-xs">json</b>
          </span>
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
