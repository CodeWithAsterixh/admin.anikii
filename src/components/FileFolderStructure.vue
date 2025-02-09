<script setup lang="ts">
import type { AnimeListItem } from '@/_types/_filePageItem'
import { downloadJSON } from '@/helpers/downloadContent'
import { useFilesStore } from '@/store'
import { RouterLink } from 'vue-router'
import DownloadModal from './DownloadModal.vue'

const { setCurrentlyViewed } = useFilesStore()
const { data, fileName, link } = defineProps<{
  data?: AnimeListItem[]
  fileName?: string
  link?: string
}>()
const handleDownload = async (name: string) => {
  if (data) {
    downloadJSON(data, `${name}.json`)
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
      <DownloadModal
        :file-name="fileName ? fileName : ''"
        :handle-download="handleDownload"
        :file="{
          type: 'content',
          thumbnail: data && data[0].coverImage.cover_image ? data[0].coverImage.cover_image : '',
          contents: data,
        }"
      />
      <span class="absolute bg-neutral-900 p-2 top-0 right-0 block z-20 text-xs rounded-bl-md"
        >contents: {{ data?.length }}</span
      >
    </span>

    <div class="w-full h-fit flex flex-col gap-2 px-1 pb-2">
      <b class="w-full line-clamp-2 text-sm sm:text-base text-center break-all">{{ fileName }}</b>
    </div>
  </RouterLink>
</template>
