<template>
  <div
    v-if="state.data"
    class="min-h-screen flex justify-center text-white px-2 min-[498px]:px-4 py-10"
  >
    <div class="max-w-4xl mx-auto flex flex-col gap-3">
      <header class="text-center mb-10">
        <h1 class="text-4xl font-bold text-blue-400">Anikii API</h1>
        <p class="text-gray-400">Your gateway to anime data</p>
      </header>

      <section class="bg-neutral-900 p-6 rounded-lg shadow-lg mb-8">
        <h2 class="text-2xl font-semibold text-blue-300 mb-4">Welcome Message</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li v-for="(msg, index) in state.data.message" :key="index">{{ msg }}</li>
        </ul>
      </section>

      <section class="bg-neutral-900 p-6 rounded-lg shadow-lg mb-8">
        <h2 class="text-2xl font-semibold text-blue-300 mb-4">Terms of Use</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li v-for="(term, index) in state.data.terms_of_use" :key="index">{{ term }}</li>
        </ul>
      </section>

      <section class="bg-neutral-900 p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-blue-300 mb-4">Available Endpoints</h2>
        <ul class="space-y-4">
          <li
            v-for="(endpoint, index) in state.data.endpoints"
            :key="index"
            class="border-b border-gray-600 pb-2"
          >
            <p class="text-blue-400 font-semibold">{{ endpoint.endpoint }}</p>
            <p class="text-gray-300 text-sm">{{ endpoint.description }}</p>
          </li>
        </ul>
      </section>

      <footer class="text-center mt-10 text-gray-500">
        <p class="flex flex-wrap gap-2 items-center justify-center">
          API Base URL:
          <a :href="state.data.liveurl" target="_blank" class="text-blue-400">{{
            state.data.liveurl
          }}</a>
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { homeData } from '@/_types'
import { makeQuery } from '@/helpers/makeQuery'
import { onMounted, reactive } from 'vue'

const state = reactive<{ data?: homeData }>({})
onMounted(async () => {
  try {
    const res = await makeQuery(`/`)
    state.data = res.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
