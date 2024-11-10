<script setup>
import { ref, watch, onMounted } from 'vue'
import WorkCards from './components/WorkCards.vue'
import PopUpWraepper from './components/PopUpWraepper.vue'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import AddEditCard from './components/AddEditCard.vue'

const datas = ref([])
const lastId = ref(0)

const isAddingOrEditing = ref(false)

onMounted(() => {
  let localContent
  try {
    localContent = JSON.parse(localStorage.getItem('cards'))
    lastId.value = localContent[localContent.length - 1].id
  } catch (err) {
    console.log(err)
    localContent = []
  }

  if (localContent.length !== 0 && datas.value.length === 0) {
    datas.value = localContent
  }
  setLocalStorage()
})

function addItem(cardValues) {
  datas.value = [
    ...datas.value,
    {
      id: ++lastId.value,
      title: cardValues.title,
      desc: cardValues.desc,
      date: cardValues.date,
      starting: cardValues.starting,
      ending: cardValues.ending,
      categories: cardValues.categories,
    },
  ]
}

function removeItem(currentItem) {
  datas.value = datas.value.filter((item) => item !== currentItem)
}

function setLocalStorage() {
  if (datas.length === 0) {
    localStorage.removeItem('cards')
  } else {
    localStorage.setItem('cards', JSON.stringify(datas.value))
  }
}

watch(datas, setLocalStorage)
</script>

<template>
  <div class="flex flex-col p-8 bg-white h-full w-full">
    <header class="flex flex-row w-full justify-center items-center m-8">
      <h2 class="font-bold text-bg-olive text-4xl">Worktime posts</h2>
    </header>

    <main class="flex p-8 lg:grid lg:grid-cols-2 lg:grid-rows-2 flex-col gap-8">
      <WorkCards v-for="data in datas" :card="data" :key="data.id" :removeItem="removeItem" />
    </main>

    <div class="sticky bottom-10 flex flex-col justify-center items-center">
      <PlusCircleIcon
        class="bg-bg-olive p-4 size-24 sm:size-32 rounded-full drop-shadow-2xl shadow-2xl text-white hover:cursor-pointer hover:scale-125 transition-all ease-in-out duration-300"
        @click="() => (isAddingOrEditing = !isAddingOrEditing)"
      />
    </div>

    <PopUpWraepper
      v-if="isAddingOrEditing"
      class="bg-light-green flex flex-row sm:min-w-96 p-4 rounded-xl max-h-[90%] max-w-[96%] overflow-y-auto z-50 fixed left-[50%] translate-x-[-50%] top-[50%] -translate-y-[50%] animate-slideInFromBottom border-bg-olive border-4"
      ><AddEditCard
        :cancelDialog="
          () => {
            isAddingOrEditing = false
          }
        "
        :addItem="addItem"
      />
    </PopUpWraepper>
  </div>
</template>
