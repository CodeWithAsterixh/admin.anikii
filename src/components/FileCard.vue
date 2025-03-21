<script setup lang="ts">
import type { _fileInfo } from '@/_types/_fileInfo'
import type { AnimeListItem, PagesStructure } from '@/_types/_filePageItem'
import { downloadJSON } from '@/helpers/downloadContent'
import { makeQuery } from '@/helpers/makeQuery'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ContentItemModal from './ContentItemModal.vue'
import DownloadModal from './DownloadModal.vue'
import { useFilesStore } from '@/store'

const { data, from } = defineProps<{ data?: _fileInfo; from: 'db' | 'local' }>()
const contentData = ref<PagesStructure | string[] | AnimeListItem>()
const showModal = ref(false)
const handleDownload = async (name: string) => {
  if (contentData.value) {
    downloadJSON(contentData.value, `${name}.json`)
  }
}
const { $state } = useFilesStore()
const isInDb = ref(false)
const shouldUpdateDb = ref(false)
onMounted(async () => {
  try {
    const fileRes = await makeQuery(`/saved/${data?.name.replace('.json', '')}`)
    const fileResData: PagesStructure | string[] | AnimeListItem = fileRes?.data[0].data
    if (fileRes?.data[0].meta) {
      contentData.value = fileResData
    }
    const findDb = $state.files.db.find((d) => d.name === data?.name)
    if (findDb && data) {
      isInDb.value = true
      if (data?.total > findDb.total) {
        shouldUpdateDb.value = true
      }
    }
    // downloadJSON(fileResData, `${modalName.value}.json`)
  } catch (error) {
    console.error(error)
  }
})
</script>
<template>
  <div
    v-if="data?.total === 0 && data.pages === 0"
    @click="showModal = true"
    class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900"
  >
    <span class="h-44 w-full bg-neutral-100/30 relative isolate">
      <img
        v-if="data?.thumbnail"
        :src="data.thumbnail"
        :alt="data?.name"
        class="size-full object-cover object-center"
      />
      <span v-else class="size-full flex flex-col gap-1 items-center justify-center">
        <i class="pi pi-file text-3xl"></i>
        <b class="text-xs">{{ data?.type }}</b>
      </span>
      <DownloadModal
        v-if="contentData"
        :file-name="data?.name ? data?.name : ''"
        :handle-download="handleDownload"
        :file="{
          type: data?.type ? data?.type : '',
          thumbnail: data?.thumbnail ? data.thumbnail : '',
          contents: contentData,
        }"
        :from="from"
      />
      <span class="absolute bg-neutral-900 p-2 top-0 right-0 block z-20 text-xs rounded-bl-md"
        >Total: {{ data?.total }}</span
      >
      <span class="absolute bg-neutral-900 p-2 top-0 left-0 block z-20 text-xs rounded-br-md"
        >{{ data?.file_size }}kb</span
      >
      <span
        v-if="data?.pages"
        class="absolute bg-neutral-900 p-2 bottom-0 left-0 block z-20 text-xs rounded-tr-md"
        >{{ data?.pages }} Page{{ data?.pages > 1 ? 's' : null }}</span
      >
    </span>

    <div class="w-full h-fit flex flex-col gap-2 px-1 pb-2">
      <b class="w-full line-clamp-2 text-sm sm:text-base text-center break-all">{{
        data?.name.replace('.json', '')
      }}</b>
    </div>

    <ContentItemModal
      :data="contentData as AnimeListItem"
      :show-modal="showModal"
      :set-show-modal="(val) => (showModal = val)"
    />
  </div>
  <RouterLink
    v-else
    :to="`/files/${data?.name.replace('.json', '')}${from === 'db' ? '?s=d' : '?s=l'}`"
    class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900"
  >
    <span class="h-44 w-full bg-neutral-100/30 relative isolate">
      <img
        v-if="data?.thumbnail"
        :src="data.thumbnail"
        :alt="data?.name"
        class="size-full object-cover object-center"
      />
      <span v-else class="size-full flex flex-col gap-1 items-center justify-center">
        <i class="pi pi-file text-3xl"></i>
        <b class="text-xs">{{ data?.type }}</b>
      </span>
      <DownloadModal
        v-if="contentData"
        :file-name="data?.name ? data?.name : ''"
        :handle-download="handleDownload"
        :file="{
          type: data?.type ? data?.type : '',
          thumbnail: data?.thumbnail ? data.thumbnail : '',
          contents: contentData,
        }"
        :from="from"
      />
      <span class="absolute bg-neutral-900 p-2 top-0 right-0 block z-20 text-xs rounded-bl-md"
        >Total: {{ data?.total }}</span
      >
      <span class="absolute bg-neutral-900 p-2 top-0 left-0 block z-20 text-xs rounded-br-md"
        >{{ data?.file_size }}kb</span
      >
      <span
        v-if="data?.pages"
        class="absolute bg-neutral-900 p-2 bottom-0 left-0 block z-20 text-xs rounded-tr-md"
        >{{ data?.pages }} Page{{ data?.pages > 1 ? 's' : null }}</span
      >
    </span>

    <div class="w-full h-fit flex flex-col gap-2 px-1 pb-2">
      <b class="w-full line-clamp-2 text-sm sm:text-base text-center break-all">{{
        data?.name.replace('.json', '')
      }}</b>
    </div>
  </RouterLink>
</template>
