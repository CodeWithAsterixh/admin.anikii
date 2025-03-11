<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'
import NavBar from './components/NavBar.vue'
import { useFilesStore } from './store'

const { loadFiles, $state } = useFilesStore()
onMounted(() => {
  loadFiles() // Ensure it loads on first mount
})
</script>

<template>
  <NavBar />

  <RouterView v-if="$state.files && $state.status === 'done'" />
  <LoadingComponent />
  <ErrorComponent />
</template>
