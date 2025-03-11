<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const mobileMenu = reactive({
  shown: false,
  animation: 'in' as 'in' | 'out',
})

const route = useRoute()
const toggleMenu = () => {
  if (mobileMenu.shown) {
    mobileMenu.animation = 'out'
    setTimeout(() => {
      mobileMenu.shown = false
    }, 250)
  } else {
    mobileMenu.shown = true
    mobileMenu.animation = 'in'
  }
}

</script>
<template>
  <header
    class="w-full bg-neutral-700 p-2 flex items-center justify-between sticky top-0 z-20 shadow-md"
  >
    <!-- logo -->
    <strong class="text-lg">
      
      Anikii Archive</strong
    >
    <nav class="hidden min-[498px]:flex items-center gap-2">
      <RouterLink
        to="/"
        :class="[
          'bg-neutral-600 hover:bg-neutral-800 duration-300 p-2 px-3 rounded-md',
          route.path === '/' ? 'bg-neutral-800' : 'bg-neutral-600 hover:bg-neutral-800',
        ]"
        >Home</RouterLink
      >
      <RouterLink
        to="/files"
        :class="[
          'duration-300 p-2 px-3 rounded-md',
          route.path.includes('/files') ? 'bg-neutral-800' : 'bg-neutral-600 hover:bg-neutral-800',
        ]"
        >Files</RouterLink
      >
    </nav>

    <!-- mobile menu -->
    <!-- mobile trigger -->
    <button @click="toggleMenu" class="block min-[498px]:hidden size-6">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <!-- menu -->
    <aside
      v-if="mobileMenu.shown"
      :class="`min-[498px]:hidden size-6 flex flex-col gap-2 fixed z-20 h-screen top-0 left-0 bg-neutral-700 w-64 max-w-[70vw] ${mobileMenu.animation === 'in' ? 'animate-left' : 'animate-left-back'}`"
    >
      <div class="w-full bg-neutral-900 p-2">
        <strong class="text-lg">Anikii Archive</strong>
      </div>
      <nav class="w-full flex flex-col gap-2 px-2">
        <RouterLink
          to="/"
          :class="[
            'bg-neutral-600 hover:bg-neutral-800 duration-300 p-2 rounded-md',
            route.path === '/' ? 'bg-neutral-800' : 'bg-neutral-600 hover:bg-neutral-800',
          ]"
          >Home</RouterLink
        >
        <RouterLink
          to="/files"
          :class="[
            'bg-neutral-600 hover:bg-neutral-800 duration-300 p-2 rounded-md',
            route.path.includes('/files')
              ? 'bg-neutral-800'
              : 'bg-neutral-600 hover:bg-neutral-800',
          ]"
          >Files</RouterLink
        >
      </nav>
    </aside>
    <!-- bgCover -->
    <div
      v-if="mobileMenu.shown"
      @click="toggleMenu"
      :class="`w-screen h-screen bg-black/20 fixed top-0 left-0 z-10 duration-300 ${mobileMenu.animation === 'in' ? 'bg-black/20' : 'bg-black/0'}`"
    ></div>
  </header>
</template>
