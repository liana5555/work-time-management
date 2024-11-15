<script setup>
import { swalNotif } from '@/utilities/swalHelper'
import { DateTime } from 'luxon'
import { ref } from 'vue'

const props = defineProps(['cancelDialog', 'addItem', 'editCard', 'isEditing', 'card'])

const newData = ref({
  id: 0,
  title: '',
  desc: '',
  date: '',
  starting: '',
  ending: '',
  categories: '',
})

newData.value = props.card?.value || newData.value

const inputClasses = `p-2 border-2 border-bg-lghter
  rounded-xl focus:border-none 
  transition-all
  focus:outline-none focus:ring 
  focus:ring-bg-olive required:ring-red-500`
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-light-green flex flex-col gap-8 sm:min-w-96 p-4 rounded-xl"
  >
    <div class="flex flex-col">
      <label>Title</label>
      <input :class="inputClasses" v-model="newData.title" required name="title" />
    </div>
    <div class="flex flex-col">
      <label>Description</label>
      <textarea
        :class="inputClasses"
        type="text"
        v-model="newData.desc"
        name="desc"
        required
      ></textarea>
    </div>
    <div class="flex flex-col">
      <label>Starting Date</label>
      <input
        :class="inputClasses"
        v-model="newData.starting"
        type="datetime-local"
        name="starting"
        required
      />
    </div>
    <div class="flex flex-col">
      <label>Ending Date</label>
      <input
        :class="inputClasses"
        v-model="newData.ending"
        :min="newData.starting"
        type="datetime-local"
        name="ending"
        required
      />
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
        type="submit"
        class="border-bg-olive border-4 p-4 rounded-xl bg-accept-bg w-32 hover:cursor-pointer hover:shadow-2xl hover:bg-accept-bg/75 transition-all ease-in-out duration-300"
        @click="
          () => {
            if (!newData.starting || !newData.ending || !newData.title || !newData.categories) {
              swalNotif('error', 'Oops, something went wrong.')
            } else if (
              DateTime.fromISO(newData.starting).toMillis() >
              DateTime.fromISO(newData.ending).toMillis()
            ) {
              swalNotif('error', 'Oops, something went wrong.')
            } else {
              try {
                if (isEditing) {
                  editCard(newData)
                  swalNotif('success', 'You successfully edited the current item')
                } else {
                  newData.date = DateTime.now().toFormat('yyyy.MM.dd HH:mm')
                  addItem(newData)
                  swalNotif('success', 'You successfully added a new item')
                }
              } catch (err) {
                swalNotif('error', 'Oops, something went wrong.')
              }
              cancelDialog()
            }
          }
        "
      >
        {{ isEditing ? 'Edit item' : 'Add item' }}
      </button>
      <button
        class="border-bg-olive border-4 p-4 rounded-xl bg-darker-blue w-32 hover:cursor-pointer hover:shadow-2xl hover:bg-darker-blue/75 transition-all ease-in-out duration-300"
        @click="props.cancelDialog()"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
