<script setup lang="ts">
import HomeData from '@/components/HomeData.vue'

import { useFilesStore } from '@/store'
import { RouterLink } from 'vue-router'

const { $state } = useFilesStore()
</script>

<template>
  <main class="w-full flex flex-col gap-4">
    <HomeData />
  </main>
  <div class="w-full flex items-center justify-center">
    <RouterLink
      to="/files"
      v-if="$state.files.local.length > 4 || $state.files.db.length > 4"
      class="w-fit m-auto sm:w-60 bg-neutral-900 px-5 py-2 text-center rounded-md"
      >See all files</RouterLink
    >
  </div>
</template>
