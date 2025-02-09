<script setup lang="ts">
import { useFilesStore } from '@/store'

const { $state, loadFiles } = useFilesStore()
</script>
<template>
  <div
    v-if="$state.status === 'error'"
    class="w-full h-fit px-[1rem] min-[498px]:px-[5rem] pt-[5rem] flex items-center justify-center flex-col gap-4"
  >
    <strong class="flex flex-col gap-2 items-center justify-center">
      <i class="pi pi-exclamation-triangle text-3xl"></i>
      Something went wrong</strong
    >

    <div class="w-full flex-col flex gap-3">
      <p>Try these processes to troubleshoot your issues</p>
      <ol
        class="text-start list-decimal list-inside text-neutral-400 *:hover:text-neutral-200 *:w-fit *:duration-300"
      >
        <li>check your network status</li>
        <li>Turn your wifi or mobile data on and off</li>
        <li>Turn off vpn or any other proxy</li>
      </ol>
      <button
        @click="loadFiles"
        class="self-end bg-neutral-200 py-1 px-4 rounded-md text-neutral-950 cursor-pointer !mt-5"
      >
        Reload
      </button>
    </div>

    <p class="!mt-10 text-wrap break-all">
      Contact us if issues still persists
      <a
        href="mailto:peterpaultolulope@gmail.com"
        class="text-blue-500 font-bold text-wrap break-all"
        >@peterpaultolulope@gmail.com</a
      >
    </p>
  </div>
</template>
