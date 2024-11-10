<script setup>
const props = defineProps(['class'])
</script>

<template>
  <div :class="props.class">
    <slot></slot>
  </div>
</template>
