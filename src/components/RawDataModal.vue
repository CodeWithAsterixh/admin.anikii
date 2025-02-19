<script setup lang="ts">
import { ref } from 'vue'
import ModelComponent from './ModelComponent.vue'
import type { JsonSyntaxPalette, JsonSyntaxPalettes } from '@/_types/_colorPallete'

const { file, title } = defineProps<{
  file?: object
  title?: string
}>()
const showModal = ref(false)
const currentPaletteName = ref('dark_mode_friendly')
const jsonSyntaxPalettes: JsonSyntaxPalettes = {
  // Original 5 palettes
  default_high_contrast: {
    key: '#60a5fa', // Blue
    string: '#facc15', // Yellow
    number: '#f87171', // Red
    boolean: '#c084fc', // Purple
    null: '#9ca3af', // Gray
  },
  soft_pastel: {
    key: '#7dd3fc', // Sky Blue
    string: '#fb7185', // Rose
    number: '#a3e635', // Lime
    boolean: '#f472b6', // Pink
    null: '#6b7280', // Gray
  },
  dark_mode_friendly: {
    key: '#67e8f9', // Cyan
    string: '#6ee7b7', // Emerald
    number: '#fdba74', // Orange
    boolean: '#f0abfc', // Fuchsia
    null: '#d1d5db', // Light Gray
  },
  cyberpunk_neon: {
    key: '#2dd4bf', // Teal
    string: '#d9f99d', // Lime
    number: '#f472b6', // Pink
    boolean: '#818cf8', // Indigo
    null: '#6b7280', // Gray
  },
  monochrome_minimal: {
    key: '#d1d5db', // Light Gray
    string: '#9ca3af', // Gray
    number: '#6b7280', // Dark Gray
    boolean: '#4b5563', // Darker Gray
    null: '#374151', // Almost Black
  },

  // 10 New Palettes
  ocean_breeze: {
    key: '#0284c7', // Deep Blue
    string: '#38bdf8', // Light Blue
    number: '#0ea5e9', // Sky Blue
    boolean: '#06b6d4', // Aqua
    null: '#64748b', // Slate
  },
  sunset_glow: {
    key: '#fb923c', // Orange
    string: '#f43f5e', // Bright Pink
    number: '#ef4444', // Red
    boolean: '#eab308', // Gold
    null: '#9ca3af', // Gray
  },
  forest_mystic: {
    key: '#16a34a', // Green
    string: '#22c55e', // Lime Green
    number: '#84cc16', // Olive Green
    boolean: '#65a30d', // Dark Olive
    null: '#4d7c0f', // Forest Green
  },
  twilight_dreams: {
    key: '#7c3aed', // Purple
    string: '#9333ea', // Violet
    number: '#c026d3', // Magenta
    boolean: '#e879f9', // Pinkish Purple
    null: '#6b7280', // Gray
  },
  retro_wave: {
    key: '#f87171', // Red
    string: '#facc15', // Yellow
    number: '#fb7185', // Pink
    boolean: '#7dd3fc', // Sky Blue
    null: '#94a3b8', // Soft Gray
  },
  lava_flow: {
    key: '#b91c1c', // Deep Red
    string: '#f97316', // Orange
    number: '#ea580c', // Burnt Orange
    boolean: '#facc15', // Yellow
    null: '#57534e', // Charcoal
  },
  aurora_borealis: {
    key: '#4ade80', // Light Green
    string: '#34d399', // Mint Green
    number: '#06b6d4', // Aqua Blue
    boolean: '#3b82f6', // Bright Blue
    null: '#64748b', // Slate Gray
  },
  candy_pop: {
    key: '#db2777', // Hot Pink
    string: '#f472b6', // Soft Pink
    number: '#fb923c', // Neon Orange
    boolean: '#e879f9', // Bubblegum Purple
    null: '#6b7280', // Gray
  },
  midnight_horizon: {
    key: '#1e40af', // Dark Blue
    string: '#2563eb', // Bright Blue
    number: '#3b82f6', // Sky Blue
    boolean: '#9333ea', // Violet
    null: '#475569', // Dark Slate
  },
  emerald_city: {
    key: '#059669', // Emerald Green
    string: '#10b981', // Mint Green
    number: '#34d399', // Soft Aqua
    boolean: '#065f46', // Deep Green
    null: '#6b7280', // Gray
  },
}

const currentColorPalette = ref(jsonSyntaxPalettes['dark_mode_friendly'])

function setCurrentColorPalette(palette: JsonSyntaxPalette, key: string) {
  currentPaletteName.value = key
  currentColorPalette.value = palette
}
function syntaxHighlight(palette: JsonSyntaxPalette, json?: object) {
  const jsonStr = JSON.stringify(json, null, 4)
  return jsonStr.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d*)?([eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = palette.string // Default for strings

      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = palette.key // Keys
        } else {
          cls = palette.string // String values
        }
      } else if (/true|false/.test(match)) {
        cls = palette.boolean // Booleans
      } else if (/null/.test(match)) {
        cls = palette.null // Null values
      } else if (/-?\d+(\.\d*)?([eE][+\-]?\d+)?/.test(match)) {
        cls = palette.number // Numbers
      }
      return `<span style='color:${cls} ;'>${match}</span>`
    },
  )
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
