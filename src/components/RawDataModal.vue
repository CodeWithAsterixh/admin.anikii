<script setup lang="ts">
import { ref } from 'vue'
import ModelComponent from './ModelComponent.vue'
import type { JsonSyntaxPalette, JsonSyntaxPalettes } from '@/_types/_colorPallete'

const { file } = defineProps<{
  file?: object
}>()
const showModal = ref(false)
const jsonSyntaxPalettes: JsonSyntaxPalettes = {
  // Original 5 palettes
  defaultHighContrast: {
    key: '#60a5fa', // Blue
    string: '#facc15', // Yellow
    number: '#f87171', // Red
    boolean: '#c084fc', // Purple
    null: '#9ca3af', // Gray
  },
  softPastel: {
    key: '#7dd3fc', // Sky Blue
    string: '#fb7185', // Rose
    number: '#a3e635', // Lime
    boolean: '#f472b6', // Pink
    null: '#6b7280', // Gray
  },
  darkModeFriendly: {
    key: '#67e8f9', // Cyan
    string: '#6ee7b7', // Emerald
    number: '#fdba74', // Orange
    boolean: '#f0abfc', // Fuchsia
    null: '#d1d5db', // Light Gray
  },
  cyberpunkNeon: {
    key: '#2dd4bf', // Teal
    string: '#d9f99d', // Lime
    number: '#f472b6', // Pink
    boolean: '#818cf8', // Indigo
    null: '#6b7280', // Gray
  },
  monochromeMinimal: {
    key: '#d1d5db', // Light Gray
    string: '#9ca3af', // Gray
    number: '#6b7280', // Dark Gray
    boolean: '#4b5563', // Darker Gray
    null: '#374151', // Almost Black
  },

  // 10 New Palettes
  oceanBreeze: {
    key: '#0284c7', // Deep Blue
    string: '#38bdf8', // Light Blue
    number: '#0ea5e9', // Sky Blue
    boolean: '#06b6d4', // Aqua
    null: '#64748b', // Slate
  },
  sunsetGlow: {
    key: '#fb923c', // Orange
    string: '#f43f5e', // Bright Pink
    number: '#ef4444', // Red
    boolean: '#eab308', // Gold
    null: '#9ca3af', // Gray
  },
  forestMystic: {
    key: '#16a34a', // Green
    string: '#22c55e', // Lime Green
    number: '#84cc16', // Olive Green
    boolean: '#65a30d', // Dark Olive
    null: '#4d7c0f', // Forest Green
  },
  twilightDreams: {
    key: '#7c3aed', // Purple
    string: '#9333ea', // Violet
    number: '#c026d3', // Magenta
    boolean: '#e879f9', // Pinkish Purple
    null: '#6b7280', // Gray
  },
  retroWave: {
    key: '#f87171', // Red
    string: '#facc15', // Yellow
    number: '#fb7185', // Pink
    boolean: '#7dd3fc', // Sky Blue
    null: '#94a3b8', // Soft Gray
  },
  lavaFlow: {
    key: '#b91c1c', // Deep Red
    string: '#f97316', // Orange
    number: '#ea580c', // Burnt Orange
    boolean: '#facc15', // Yellow
    null: '#57534e', // Charcoal
  },
  auroraBorealis: {
    key: '#4ade80', // Light Green
    string: '#34d399', // Mint Green
    number: '#06b6d4', // Aqua Blue
    boolean: '#3b82f6', // Bright Blue
    null: '#64748b', // Slate Gray
  },
  candyPop: {
    key: '#db2777', // Hot Pink
    string: '#f472b6', // Soft Pink
    number: '#fb923c', // Neon Orange
    boolean: '#e879f9', // Bubblegum Purple
    null: '#6b7280', // Gray
  },
  midnightHorizon: {
    key: '#1e40af', // Dark Blue
    string: '#2563eb', // Bright Blue
    number: '#3b82f6', // Sky Blue
    boolean: '#9333ea', // Violet
    null: '#475569', // Dark Slate
  },
  emeraldCity: {
    key: '#059669', // Emerald Green
    string: '#10b981', // Mint Green
    number: '#34d399', // Soft Aqua
    boolean: '#065f46', // Deep Green
    null: '#6b7280', // Gray
  },
}

const currentColorPalette = ref(jsonSyntaxPalettes.darkModeFriendly)

function setCurrentColorPalette(palette: JsonSyntaxPalette) {
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
    <div class="flex flex-col gap-4 py-4 px-1 sm:px-4 w-fit max-w-full">
      <div
        v-html="syntaxHighlight(currentColorPalette, file)"
        class="text-white p-4 max-h-[70vh] max-w-full overflow-auto scroller whitespace-pre-wrap font-mono text-sm"
      ></div>

      <ul
        class="w-full p-2 flex items-center gap-2 overflow-x-auto no_scroller snap-x snap-mandatory"
      >
        <li
          v-for="(colorKey, i) in Object.keys(jsonSyntaxPalettes)"
          :key="i"
          class="size-10 rounded-md cursor-pointer shrink-0 snap-start"
          :title="`${colorKey} palette`"
          :style="{
            backgroundColor: jsonSyntaxPalettes[colorKey]['key'],
          }"
          @click="setCurrentColorPalette(jsonSyntaxPalettes[colorKey])"
        ></li>
      </ul>
    </div>
  </ModelComponent>
</template>
<style scoped>
.no_scroller::-webkit-scrollbar {
  display: none;
}
.scroller {
  padding: 0 10px 10px 0;
}
.scroller::-webkit-scrollbar {
  background-color: oklch(0.205 0 0);
  width: 5px;
  height: 5px;
}
.scroller::-webkit-scrollbar-thumb {
  background-color: oklch(0.708 0 0);
  border-radius: 9999px;
}
.scroller::-webkit-scrollbar-track-piece {
  background-color: oklch(0.269 0 0);
  border-radius: 5px;
}
.scroller::-webkit-scrollbar-corner {
  background-color: oklch(0.269 0 0);
  border-bottom-right-radius: 5px;
}
</style>
