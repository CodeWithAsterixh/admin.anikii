<script setup lang="ts">
import FileCard from '@/components/FileCard..vue'
import IsEmpty from '@/components/IsEmpty.vue'

import { useFilesStore } from '@/store'
import { RouterLink } from 'vue-router'

const { $state } = useFilesStore()
</script>

<template>
  <main class="w-full flex flex-col gap-4">
    <section
      v-if="$state.files.filter((f) => f.from === 'db').length > 0"
      class="w-full flex flex-col gap-2 p-3"
    >
      <h2 class="text-lg">Saved Datas</h2>
      <div class="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
        <FileCard
          v-for="(file, i) in $state.files.filter((f) => f.from === 'db').slice(0, 4)"
          :key="i"
          :data="file"
        />
      </div>
    </section>

    <div v-else class="w-full flex flex-col gap-3 items-center justify-center">
      <IsEmpty text="No saved files for now" :forceEmpty="true" />
      <RouterLink
        to="/files"
        class="w-fit m-auto sm:w-60 bg-neutral-900 px-5 py-2 text-center rounded-md"
        >See all files</RouterLink
      >
    </div>
  </main>
  <div class="w-full flex items-center justify-center">
    <RouterLink
      to="/files"
      v-if="$state.files.length > 4"
      class="w-fit m-auto sm:w-60 bg-neutral-900 px-5 py-2 text-center rounded-md"
      >See all files</RouterLink
    >
  </div>
</template>
