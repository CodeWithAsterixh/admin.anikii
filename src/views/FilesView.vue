<script setup lang="ts">
import FileCard from '@/components/FileCard..vue'

import { useFilesStore } from '@/store'

const { $state } = useFilesStore()
</script>

<template>
  <main class="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] p-2 gap-2">
    <FileCard v-for="(file, i) in $state.files" :key="i" :data="file" />
  </main>
</template>
