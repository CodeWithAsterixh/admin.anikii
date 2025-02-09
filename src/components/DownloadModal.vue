<script setup lang="ts">
import { ref } from 'vue'
import ModelComponent from './ModelComponent.vue'

const {
  fileName = '',
  handleDownload,
  file,
} = defineProps<{
  fileName: string
  handleDownload: (name: string) => void
  file: {
    thumbnail?: string
    type: string
  }
}>()
const showModal = ref(false)
const inputVal = ref(fileName)

function download() {
  handleDownload(inputVal.value)
  showModal.value = false
}
</script>
<template>
  <i
    @click.stop.prevent="showModal = true"
    class="pi pi-download absolute bg-neutral-900 p-2 bottom-0 right-0 block z-20 text-xs rounded-tl-md"
  ></i>
  <ModelComponent :is-open="showModal" @close="showModal = false">
    <div class="flex flex-col gap-4 p-4">
      <div class="w-full flex gap-2 items-center flex-col">
        <span class="text-lg">Download the json data of this content</span>

        <span class="block w-fit h-fit max-w-full">
          <img
            v-if="file.thumbnail"
            :src="file.thumbnail"
            alt=""
            class="max-h-56 object-contain object-center rounded-md"
          />
          <span v-else class="size-full w-28 h-64 flex flex-col gap-1 items-center justify-center">
            <i class="pi pi-file text-3xl"></i>
            <b class="text-xs">{{ file.type }}</b>
          </span>
        </span>
      </div>
      <label for="name" class="flex flex-col gap-2">
        <span class="text-lg">Save as:</span>
        <input
          type="text"
          id="name"
          class="w-full p-2 border-2 border-neutral-500 rounded-md"
          v-model="inputVal"
        />
      </label>

      <div class="w-full flex gap-3 items-center justify-center *:cursor-pointer">
        <button class="w-full p-2 bg-neutral-600 rounded-md" @click="showModal = false">
          cancel
        </button>
        <button @click="download" class="w-full p-2 bg-black rounded-md">Save</button>
      </div>
    </div>
  </ModelComponent>
</template>
