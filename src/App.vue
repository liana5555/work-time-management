<script setup>
import { ref, watch, onMounted } from 'vue'
import WorkCards from './components/WorkCards.vue'
import PopUpWraepper from './components/PopUpWraepper.vue'
import { ArrowDownCircleIcon, ArrowUpCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/solid'
import AddEditCard from './components/AddEditCard.vue'
import FilteringOptions from './components/FilteringOptions.vue'
import { DateTime } from 'luxon'

const datas = ref([])
const lastId = ref(0)

const isAddingOrEditing = ref(false)
const isEditing = ref(false)

const filteredData = ref([])
const isFiltered = ref(false)
const filterBy = ref({
  filterByTimePeriod: '',
  filterByProperty: '',
})
const valueForFiltering = ref('')
const showFilteringOptions = ref(false)

const currentCard = ref({
  id: 0,
  title: '',
  desc: '',
  date: '',
  starting: '',
  ending: '',
  categories: '',
})

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

function editCard(card) {
  datas.value = datas.value.map((item) => {
    if (item.id === card.id) {
      return card
    } else {
      return item
    }
  })
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

function setFilteringOptions(filteringValue, filteringBy) {
  valueForFiltering.value = filteringValue

  filterBy.value = filteringBy
}

watch(datas, setLocalStorage)

watch(isEditing, (newValue) => {
  if (!newValue) {
    currentCard.value = {
      id: 0,
      title: '',
      desc: '',
      date: '',
      starting: '',
      ending: '',
      categories: '',
    }
  }
})

watch(valueForFiltering, (newValueForFiltering) => {
  if (newValueForFiltering && isFiltered) {
    filteredData.value = datas.value.filter(cbForFiltering)
  }
})

function cbForFiltering(item) {
  const filteringValue = DateTime.fromISO(valueForFiltering.value)
  const filterProp = filterBy.value.filterByProperty

  const itemTime =
    filterProp !== 'date'
      ? DateTime.fromISO(item[filterProp])
      : DateTime.fromFormat(item[filterProp], 'yyyy.MM.dd HH:mm')

  let valueToFilterWith
  let valueOfTheItem

  if (filterBy.value.filterByTimePeriod === 'day') {
    valueToFilterWith = filteringValue.toFormat('yyyy-MM-dd')
    valueOfTheItem = itemTime.toFormat('yyyy-MM-dd')
  } else if (filterBy.value.filterByTimePeriod === 'month') {
    valueToFilterWith = filteringValue.toFormat('yyyy-MM')
    valueOfTheItem = itemTime.toFormat('yyyy-MM')
  } else {
    valueToFilterWith = filteringValue.toFormat('yyyy WW')
    valueOfTheItem = itemTime.toFormat('yyyy WW')
  }

  if (valueToFilterWith.toString() === valueOfTheItem.toString()) {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <div class="flex flex-col p-4 bg-white h-full w-full items-center">
    <header class="flex flex-row w-full justify-center items-center mt-8 mb-8">
      <h2 class="font-bold text-bg-lghter text-4xl">Worktime posts</h2>
    </header>
    <div class="flex flex-col justify-center items-center gap-8 p-8 rounded-xl w-full sm:w-fit">
      <div class="flex flex-row justify-center items-center gap-4 text-bg-olive">
        <h3 class="font-bold text-xl">Filtering options</h3>
        <ArrowDownCircleIcon
          :class="`size-10 ${!showFilteringOptions ? 'rotate-0' : 'rotate-180'} transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-125`"
          @click="() => (showFilteringOptions = !showFilteringOptions)"
        />
      </div>

      <FilteringOptions
        v-if="showFilteringOptions"
        :filteringOn="() => (isFiltered = true)"
        :filteringOff="() => (isFiltered = false)"
        :setFilteringOptions="setFilteringOptions"
      />
    </div>

    <main class="flex p-4 lg:grid lg:grid-cols-3 lg:grid-rows-2 flex-col gap-8 w-full">
      <WorkCards
        v-if="!isFiltered"
        v-for="data in datas"
        :card="data"
        :key="data.id"
        :removeItem="removeItem"
        :enableEditing="
          () => {
            isEditing = true
            isAddingOrEditing = true
            currentCard.value = data
          }
        "
      />
      <WorkCards
        v-else="isFiltered"
        v-for="filter in filteredData"
        :card="filter"
        :key="filter.id"
        :removeItem="removeItem"
        :enableEditing="
          () => {
            isEditing = true
            isAddingOrEditing = true
            currentCard.value = filter
          }
        "
      />
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
            isEditing = false
            isAddingOrEditing = false
          }
        "
        :addItem="addItem"
        :card="currentCard"
        :editCard="editCard"
        :isEditing="isEditing"
      />
    </PopUpWraepper>
  </div>
</template>
