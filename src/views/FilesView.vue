<script setup lang="ts">
import FileCard from '@/components/FileCard.vue'

import { useFilesStore } from '@/store'

const { $state } = useFilesStore()
</script>

<template>
  <main class="w-full flex flex-col gap-4">
    <section v-if="$state.files.db.length > 0" class="w-full flex flex-col gap-2 p-3">
      <h2 class="text-lg">Saved Datas</h2>
      <div class="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
        <FileCard v-for="(file, i) in $state.files.db" :key="i" :data="file" from="db" />
      </div>
    </section>

    <section v-if="$state.files.local.length > 0" class="w-full flex flex-col gap-2 p-3">
      <h2 class="text-lg">Temporary files</h2>
      <div class="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
        <FileCard v-for="(file, i) in $state.files.local" :key="i" :data="file" from="local" />
      </div>
    </section>
  </main>
</template>
