<script setup lang="ts">
import { defineProps } from 'vue'
import type { _fileInfo } from '@/_types/_fileInfo'

const { data } = defineProps<{ data?: _fileInfo }>()
</script>
<template>
  <div class="flex flex-col gap-2 items-center shadow-md rounded-md overflow-hidden bg-neutral-900">
    <span class="h-44 w-full bg-neutral-100/30 relative isolate">
      <img
        v-if="data?.thumbnail"
        :src="data.thumbnail"
        :alt="data?.name"
        class="size-full object-cover object-center"
      />
      <span v-else class="size-full flex flex-col gap-1 items-center justify-center">
        <i class="pi pi-file text-3xl"></i>
        <b class="text-xs">{{ data?.type }}</b>
      </span>
      <span class="absolute bg-neutral-900 p-2 top-0 right-0 block z-20 text-xs rounded-bl-md"
        >Total: {{ data?.total }}</span
      >
      <span class="absolute bg-neutral-900 p-2 bottom-0 right-0 block z-20 text-xs rounded-tl-md"
        >{{ data?.file_size }}kb</span
      >
      <span
        v-if="data?.pages"
        class="absolute bg-neutral-900 p-2 bottom-0 left-0 block z-20 text-xs rounded-tr-md"
        >{{ data?.pages }} Page{{ data?.pages > 1 ? 's' : null }}</span
      >
    </span>

    <div class="w-full h-fit flex flex-col gap-2 px-1 pb-2">
      <b class="w-full line-clamp-2 text-sm sm:text-base text-center break-all">{{
        data?.name.replace('.json', '')
      }}</b>
    </div>
  </div>
</template>
