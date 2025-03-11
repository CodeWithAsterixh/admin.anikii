<script setup lang="ts">
import { ref } from 'vue'
import ModelComponent from './ModelComponent.vue'
import RawDataModal from './RawDataModal.vue'
import UpdateDbStorageModal from './UpdateDbStorageModal.vue'

const {
  fileName = '',
  handleDownload,
  file,
  from = 'temp',
} = defineProps<{
  fileName: string
  handleDownload: (name: string) => void
  file: {
    thumbnail?: string
    type: string
    contents: object
  }
  from?: 'db' | 'local'
}>()
const showModal = ref(false)
const inputVal = ref(fileName.replace('.json', ''))

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
    <div class="flex flex-col gap-4 p-4 w-lg max-w-full">
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
        <div class="w-full flex gap-3 justify-between flex-col min-[498px]:flex-row">
          <div class="w-full flex border-2 border-neutral-500 rounded-md">
            <input type="text" id="name" class="w-full p-2 outline-none" v-model="inputVal" />
            <span class="w-fit bg-neutral-700 flex items-center px-2 justify-center"
              >.{{ file.type }}</span
            >
          </div>
          <RawDataModal :file="file.contents" :title="inputVal" />
        </div>
      </label>

      <div
        class="w-full flex gap-3 items-center justify-center *:cursor-pointer flex-wrap *:basis-[100px] *:grow"
      >
        <button class="w-full p-2 bg-neutral-600 rounded-md" @click="showModal = false">
          cancel
        </button>
        <button
          @click="download"
          class="w-full p-2 bg-black rounded-md flex items-center justify-center gap-2"
        >
          <i class="pi pi-download"></i> Download
        </button>
        <UpdateDbStorageModal
          :type="from === 'db' ? 'delete' : 'save'"
          :file="file.contents"
          :file-name="fileName"
        />
      </div>
    </div>
  </ModelComponent>
</template>
