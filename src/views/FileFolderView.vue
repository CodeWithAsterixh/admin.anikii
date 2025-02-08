<script setup lang="ts">
import type { PagesStructure } from '@/_types/_filePageItem'
import FileFolderStructure from '@/components/FileFolderStructure.vue'
import { makeQuery } from '@/helpers/makeQuery'
import { useFilesStore } from '@/store'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
const router = useRoute()

const { $state } = useFilesStore()
const file = $state.files.find((file) => file.name.includes(`${router.params.name}`))

const fileData = reactive<{
  data?: PagesStructure | string[]
}>({})

onMounted(async () => {
  if (file) {
    try {
      const fileRes = await makeQuery(`/listTmp/${file.name.replace('.json', '')}`)
      const fileResData: PagesStructure | string[] = fileRes.data[0].data
      fileData.data = fileResData
    } catch (error) {
      console.error(error)
    }
  }
})
</script>

<template>
  <div
    v-if="fileData.data && Array.isArray(fileData.data)"
    class="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] p-2 gap-2"
  >
    <div
      v-for="item in fileData.data"
      :key="item"
      class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900"
    >
      <span class="h-44 w-full bg-neutral-100/30 relative isolate">
        <span class="size-full flex flex-col gap-1 items-center justify-center">
          <i class="pi pi-align-left text-3xl"></i>
          <b class="text-xs">text</b>
        </span>
      </span>

      <div class="w-full h-fit flex flex-col gap-2 px-1 pb-2">
        <b class="w-full line-clamp-2 text-sm sm:text-base text-center break-all">{{ item }}</b>
      </div>
    </div>
  </div>
  <main
    v-else-if="fileData.data"
    class="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] p-2 gap-2"
  >
    <FileFolderStructure
      v-for="key in Object.keys(fileData.data.pages)"
      :key="key"
      :data="fileData.data.pages[key]"
      :file-name="`page ${key}`"
      :link="`/files/${router.params.name}/page_${key}`"
      class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900"
    />
  </main>
</template>
