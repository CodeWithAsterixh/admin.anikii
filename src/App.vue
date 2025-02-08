<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { onMounted } from 'vue'
import { useFilesStore } from './store'

const { loadFiles, $state } = useFilesStore()
onMounted(() => {
  loadFiles() // Ensure it loads on first mount
})
</script>

<template>
  <NavBar />

  <RouterView v-if="$state.files" />
</template>
