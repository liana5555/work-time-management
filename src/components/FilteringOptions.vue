<script setup>
import { ref } from 'vue'

const props = defineProps(['filteringOn', 'filteringOff', 'setFilteringOptions'])

const filterBy = ref({
  filterByTimePeriod: '',
  filterByProperty: '',
})
const valueForFiltering = ref('')
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col items-center justify-center gap-4">
    <div class="flex flex-row gap-8">
      <div class="flex flex-row gap-2">
        <label for="day">Created at</label>
        <input
          type="radio"
          v-model="filterBy.filterByProperty"
          name="filteringProperty"
          id="day"
          value="date"
          required
        />
      </div>
      <div class="flex flex-row gap-2">
        <label for="week">Starting date</label>
        <input
          type="radio"
          v-model="filterBy.filterByProperty"
          name="filteringProperty"
          id="week"
          value="starting"
          required
        />
      </div>
      <div class="flex flex-row gap-2">
        <label for="month">Ending date</label>
        <input
          type="radio"
          v-model="filterBy.filterByProperty"
          name="filteringProperty"
          id="month"
          value="ending"
          required
        />
      </div>
    </div>
    <div class="flex flex-row gap-8">
      <div class="flex flex-row gap-2">
        <label for="day">Day</label>
        <input
          type="radio"
          v-model="filterBy.filterByTimePeriod"
          name="timePeriod"
          id="day"
          value="day"
          required
        />
      </div>
      <div class="flex flex-row gap-2">
        <label for="week">Week</label>
        <input
          type="radio"
          v-model="filterBy.filterByTimePeriod"
          name="timePeriod"
          id="week"
          value="week"
          required
        />
      </div>
      <div class="flex flex-row gap-2">
        <label for="month">Month</label>
        <input
          type="radio"
          v-model="filterBy.filterByTimePeriod"
          name="timePeriod"
          id="month"
          value="month"
          required
        />
      </div>
    </div>

    <div>
      <input v-if="filterBy.filterByTimePeriod === 'day'" type="date" v-model="valueForFiltering" />
      <input
        v-else-if="filterBy.filterByTimePeriod === 'week'"
        type="week"
        v-model="valueForFiltering"
      />
      <input
        v-else-if="filterBy.filterByTimePeriod === 'month'"
        type="month"
        v-model="valueForFiltering"
      />
    </div>
    <div class="flex flex-row gap-4">
      <button
        class="border-bg-olive border-2 p-4 rounded-xl bg-darker-blue w-32 hover:cursor-pointer hover:shadow-2xl hover:bg-darker-blue/75 transition-all ease-in-out duration-300"
        @click="
          () => {
            setFilteringOptions(valueForFiltering, filterBy)
            filteringOn()
          }
        "
      >
        Filter
      </button>
      <button
        type="reset"
        class="border-bg-olive border-2 p-4 rounded-xl bg-darker-blue w-32 hover:cursor-pointer hover:shadow-2xl hover:bg-darker-blue/75 transition-all ease-in-out duration-300"
        @click="filteringOff"
      >
        Show All
      </button>
    </div>
  </form>
</template>
