<script setup lang="ts">
import { ref } from 'vue'
import ModelComponent from './ModelComponent.vue'
import type { JsonSyntaxPalette } from '@/_types/_colorPallete'
import { jsonSyntaxPalettes } from '@/helpers/JSONPALETTE'
import { syntaxHighlight } from '@/helpers/syntaxModifier'

const { file, title } = defineProps<{
  file?: object
  title?: string
}>()
const showModal = ref(false)
const currentPaletteName = ref('dark_mode_friendly')

const currentColorPalette = ref(jsonSyntaxPalettes['dark_mode_friendly'])

function setCurrentColorPalette(palette: JsonSyntaxPalette, key: string) {
  currentPaletteName.value = key
  currentColorPalette.value = palette
}
</script>
<template>
  <button
    @click.stop.prevent="showModal = true"
    class="w-fit px-4 py-2 bg-neutral-950 rounded-md flex items-center justify-center gap-2 cursor-pointer"
  >
    <i class="pi pi-eye text-xs"></i>
    Raw
  </button>
  <ModelComponent :is-open="showModal" @close="showModal = false">
    <div class="w-full flex gap-2 flex-col h-full">
      <div class="w-full !mb-2 shrink-0">
        <h2>{{ title }}</h2>
      </div>
      <div class="flex flex-col gap-4 w-fit max-w-full h-full shrink">
        <div class="w-full p-4 bg-neutral-950 rounded-md shrink">
          <div
            v-html="syntaxHighlight(currentColorPalette, file)"
            class="text-white h-full max-h-[55vh] max-w-full overflow-auto scroller whitespace-pre-wrap font-mono text-sm"
          ></div>
        </div>

        <ul
          class="w-full p-2 flex items-center shrink-0 gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          <li
            v-for="(colorKey, i) in Object.keys(jsonSyntaxPalettes)"
            :key="i"
            class="size-10 rounded-md cursor-pointer shrink-0 snap-start border-black duration-500"
            :title="`${colorKey} palette`"
            :style="{
              backgroundColor: jsonSyntaxPalettes[colorKey]['key'],
              borderWidth:
                currentColorPalette.key == jsonSyntaxPalettes[colorKey]['key'] ? '5px' : '',
            }"
            @click="setCurrentColorPalette(jsonSyntaxPalettes[colorKey], colorKey)"
          ></li>
        </ul>
        <span class="block shrink-0 text-neutral-500"
          >Selected color template:
          <b class="capitalize text-neutral-100">{{
            currentPaletteName.split('_').join(' ')
          }}</b></span
        >
      </div>
    </div>
  </ModelComponent>
</template>
<style scoped></style>
