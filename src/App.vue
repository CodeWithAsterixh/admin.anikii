<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { onMounted } from 'vue'
import { useFilesStore } from './store'

const { loadFiles } = useFilesStore()
onMounted(() => {
  loadFiles()
})
</script>

<template>
  <NavBar />

  <RouterView />
</template>
