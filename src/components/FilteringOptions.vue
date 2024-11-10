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
  <form @submit.prevent="onSubmit" class="flex flex-col items-center justify-center">
    <h2>Filtering options</h2>
    <div class="flex flex-row gap-4">
      <div>
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
      <div>
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
      <div>
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
    <div class="flex flex-row gap-4">
      <div>
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
      <div>
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
      <div>
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
        class="border-bg-olive border-4 p-4 rounded-xl bg-darker-blue w-32 hover:cursor-pointer"
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
        class="border-bg-olive border-4 p-4 rounded-xl bg-darker-blue w-32 hover:cursor-pointer"
        @click="filteringOff"
      >
        Nonfiltered
      </button>
    </div>
  </form>
</template>
