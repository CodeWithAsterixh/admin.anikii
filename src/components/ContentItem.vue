<script setup lang="ts">
import type { AnimeListItem } from '@/_types/_filePageItem'
import { downloadJSON } from '@/helpers/downloadContent'
import { ref } from 'vue'
import ContentItemModal from './ContentItemModal.vue'
import DownloadModal from './DownloadModal.vue'

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
    <span class="h-44 w-full bg-neutral-100/30 relative isolate cursor-pointer">
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
          type: 'json',
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

  <ContentItemModal
    :data="data"
    :show-modal="showModal"
    :set-show-modal="(val) => (showModal = val)"
  />
</template>
