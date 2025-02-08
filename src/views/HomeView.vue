<script setup lang="ts">
import FileCard from '@/components/FileCard..vue'

import { useFilesStore } from '@/store'
import { RouterLink } from 'vue-router'

const { $state } = useFilesStore()
</script>

<template>
  <main class="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] p-2 gap-2">
    <FileCard v-for="(file, i) in $state.files.slice(0, 4)" :key="i" :data="file" />
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
