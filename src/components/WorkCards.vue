<script setup>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { swalNotif } from '@/utilities/swalHelper'
import { DateTime } from 'luxon'

const props = defineProps(['card', 'removeItem', 'enableEditing'])
</script>

<template>
  <div class="bg-light-green flex flex-row lg:w-min-96 p-4 rounded-xl shadow-lg">
    <div class="basis-5/6">
      <div>
        <h3 class="font-bold text-lg">{{ card.title }}</h3>
        <h4 class="text-sm">Created at: {{ card.date }}</h4>
        <p style="white-space: pre-line">Description: {{ card.desc }}</p>
      </div>
      <div>Starting Date: {{ DateTime.fromISO(card.starting).toFormat('yyyy.MM.dd HH:mm') }}</div>
      <div>Ending date: {{ DateTime.fromISO(card.ending).toFormat('yyyy.MM.dd HH:mm') }}</div>
      <div>Category: {{ card.categories }}</div>
    </div>
    <div class="basis-1/6 justify-center items-center gap-4 flex flex-col">
      <PencilSquareIcon
        class="size-6 hover:cursor-pointer hover:scale-125 transition-all ease-in-out duration-300"
        @click="enableEditing"
      />
      <TrashIcon
        class="size-6 hover:cursor-pointer hover:scale-125 transition-all ease-in-out duration-300"
        @click="
          () => {
            removeItem(card)
            swalNotif('success', 'You successfully removed the item')
          }
        "
      />
    </div>
  </div>
</template>
