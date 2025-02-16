<script setup lang="ts">
import type { PagesStructure } from '@/_types/_filePageItem'
import ContentItem from '@/components/ContentItem.vue'
import { makeQuery } from '@/helpers/makeQuery'
import { useFilesStore } from '@/store'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const router = useRoute()

const { name, page } = router.params

const { $state, setCurrentlyViewed } = useFilesStore()
console.log($state.currentlyViewed)

onMounted(async () => {
  if (!$state.currentlyViewed) {
    $state.status = 'loading'
    try {
      const fileRes = await makeQuery(`/listTmp/${name}`)
      const fileResData: PagesStructure = fileRes?.data[0].data
      if (Object.keys(fileResData).length === 0) {
        $state.isEmpty = true
        $state.status = 'done'
        return
      }
      $state.isEmpty = false
      $state.status = 'done'
      setCurrentlyViewed(fileResData.pages[`${page}`.replace('page_', '')])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      $state.status = 'error'
    }
  }
})
</script>

<template>
  <main
    v-if="$state.currentlyViewed && !$state.isEmpty"
    class="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] p-2 gap-2"
  >
    <ContentItem
      v-for="item in $state.currentlyViewed"
      :key="item.id"
      :data="item"
      class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900"
    />
  </main>
</template>
