<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['cancelDialog', 'addItem'])

const newData = ref({
  id: 0,
  title: '',
  desc: '',
  date: '',
  starting: '',
  ending: '',
  categories: '',
})
</script>

<template>
  <div class="bg-light-green flex flex-col gap-8 sm:min-w-96 p-4 rounded-xl">
    <div class="flex flex-col">
      <label>Title</label>
      <input v-model="newData.title" />
    </div>
    <div class="flex flex-col">
      <label>Description</label>
      <textarea type="text" v-model="newData.desc"></textarea>
    </div>
    <div class="flex flex-col">
      <label>Starting Date</label>
      <input v-model="newData.starting" type="datetime-local" />
    </div>
    <div class="flex flex-col">
      <label>Ending Date</label>
      <input v-model="newData.starting" type="datetime-local" />
    </div>
    <div>
      <h3>Category</h3>
      <div class="flex flex-row justify-evenly">
        <div class="flex flex-row gap-4">
          <label name="categories">Project</label>
          <input v-model="newData.categories" type="radio" name="categories" value="project" />
        </div>
        <div class="flex flex-row gap-4">
          <label name="categories">Client</label>
          <input v-model="newData.categories" type="radio" name="categories" value="client" />
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-4 justify-evenly items-center">
      <button
        class="border-bg-olive border-4 p-4 rounded-xl bg-accept-bg w-32 hover:cursor-pointer hover:shadow-2xl hover:bg-accept-bg/75 transition-all ease-in-out duration-300"
        @click="
          () => {
            addItem(newData)
            cancelDialog()
          }
        "
      >
        Add item
      </button>
      <button
        class="border-bg-olive border-4 p-4 rounded-xl bg-darker-blue w-32 hover:cursor-pointer hover:shadow-2xl hover:bg-darker-blue/75 transition-all ease-in-out duration-300"
        @click="props.cancelDialog"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
