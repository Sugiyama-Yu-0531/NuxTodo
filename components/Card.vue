<script setup lang="ts">
const props = defineProps({
  title: String,
  subtitle: String,
})
</script>

<template>
  <v-card
    :title="props.title"
    :subtitle="props.subtitle"
    elevation="3"
  >
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>