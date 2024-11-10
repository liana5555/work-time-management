<script setup>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'

const props = defineProps(['card'])
</script>

<template>
  <div class="bg-light-green flex flex-row lg:w-min-96 p-4 rounded-xl shadow-lg">
    <div class="basis-5/6">
      <div>
        <h3 class="font-bold text-lg">{{ card.title }}</h3>
        <h4 class="text-sm">Created at: {{ card.date }}</h4>
        <p>Description: {{ card.desc }}</p>
      </div>
      <div>Starting Date: {{ card.starting }}</div>
      <div>Ending date: {{ card.ending }}</div>
      <div>Category: {{ card.categories }}</div>
    </div>
    <div class="basis-1/6 justify-center items-center gap-4 flex flex-col">
      <PencilSquareIcon
        class="size-6 hover:cursor-pointer hover:scale-125 transition-all ease-in-out duration-300"
      />
      <TrashIcon
        class="size-6 hover:cursor-pointer hover:scale-125 transition-all ease-in-out duration-300"
      />
    </div>
  </div>
</template>
