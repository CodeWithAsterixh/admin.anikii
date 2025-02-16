<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { onMounted, watch } from 'vue'
import { useFilesStore } from './store'
import IsEmpty from './components/IsEmpty.vue'
import LoadingComponent from './components/LoadingComponent.vue'
import ErrorComponent from './components/ErrorComponent.vue'

const { loadFiles, $state } = useFilesStore()
onMounted(() => {
  loadFiles() // Ensure it loads on first mount
})
watch($state, () => {
  console.log($state)
})
</script>

<template>
  <NavBar />

  <RouterView v-if="$state.files && $state.status === 'done'" />
  <IsEmpty />
  <LoadingComponent />
  <ErrorComponent />
</template>
