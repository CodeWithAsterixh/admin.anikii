<script setup lang="ts">
import { makeQuery } from '@/helpers/makeQuery'
import { useFilesStore } from '@/store'
import { ref } from 'vue'
import ModelComponent from './ModelComponent.vue'

const {
  fileName = '',
  file,
  type = 'save',
} = defineProps<{
  fileName: string
  file: object
  type: 'save' | 'delete' | 'update'
}>()
const showModal = ref(false)
const inputVal = ref('')
const showPass = ref(false)
const error = ref<false | string>(false)
const { loadFiles } = useFilesStore()
async function store() {
  const pass = import.meta.env.VITE_PASSKEY
  if (inputVal.value === pass) {
    try {
      await makeQuery(
        '/savefile',
        {
          name: `${fileName}.json`,
          data: file,
        },
        'POST',
      )

      loadFiles()

      error.value = false
      showModal.value = false
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      error.value = 'something went wrong, please try again later!'
    }
  } else {
    error.value = 'Wrong password'
  }
}
async function deleteFile() {
  const pass = import.meta.env.VITE_PASSKEY
  if (inputVal.value === pass) {
    try {
      await makeQuery(`/saved/${fileName}.json?storage=db`, {}, 'DELETE')

      loadFiles()

      error.value = false
      showModal.value = false
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      error.value = 'something went wrong, please try again later!'
    }
  } else {
    error.value = 'Wrong password'
  }
}
</script>
<template>
  <button
    @click.stop.prevent="showModal = true"
    :class="`w-full p-2 bg-black rounded-md flex items-center justify-center gap-2 ${
      type === 'delete' ? 'bg-red-500' : 'bg-blue-500'
    }`"
  >
    <i class="pi pi-database"></i>
    {{ type === 'delete' ? 'Delete' : 'Save' }}
  </button>
  <ModelComponent :is-open="showModal" @close="showModal = false">
    <div class="flex flex-col gap-4 p-4 w-sm">
      <h1 class="text-xl font-bold">Admin access only</h1>
      <div class="w-full flex gap-2 flex-col">
        <div class="w-full flex flex-col">
          <b class="text-sm"
            >Saving as: <i class="text-blue-300 not-italic">{{ fileName }}</i></b
          >
          <em class="text-xs text-amber-300 not-italic"
            >You can't change the name of this file on the store</em
          >
        </div>
        <b class="text-base">Please enter your password to continue</b>
      </div>
      <label for="password" class="flex flex-col gap-2">
        <span class="text-base">Password:</span>
        <div class="w-full flex gap-1 justify-between flex-col">
          <div class="w-full flex items-center border-2 border-neutral-500 rounded-md">
            <input
              id="password"
              placeholder="password"
              :type="!showPass ? 'password' : 'text'"
              class="w-full p-2 outline-none"
              v-model="inputVal"
            />
            <i
              @click="showPass = !showPass"
              :class="`pi ${showPass ? 'pi-eye-slash' : 'pi-eye'} cursor-pointer p-3 text-lg`"
            ></i>
          </div>
          <b class="text-xs sm:text-sm text-red-400">{{ error ? error : '' }}</b>
        </div>
      </label>

      <div
        class="w-full flex gap-3 items-center justify-center *:cursor-pointer flex-wrap *:basis-[100px] *:grow"
      >
        <button class="w-full p-2 bg-neutral-600 rounded-md" @click="showModal = false">
          cancel
        </button>
        <button
          @click="type === 'delete' ? deleteFile() : store()"
          class="w-full p-2 bg-black rounded-md"
        >
          {{ type === 'delete' ? 'Delete' : 'Store' }}
        </button>
      </div>
    </div>
  </ModelComponent>
</template>
