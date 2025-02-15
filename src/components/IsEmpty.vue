<script setup lang="ts">
import { useFilesStore } from '@/store'

const { forceEmpty = false, text = 'Archive is empty' } = defineProps<{
  forceEmpty?: boolean
  text?: string
}>()
const { $state } = useFilesStore()
</script>
<template>
  <div
    v-if="$state.isEmpty || forceEmpty"
    class="w-full h-fit px-[1rem] min-[498px]:px-[5rem] pt-[5rem] flex items-center justify-center flex-col gap-2"
  >
    <i class="pi pi-server text-7xl text-neutral-500"></i>
    {{ text }}
  </div>
</template>
