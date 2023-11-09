<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';

</script>

<template>
  <v-app>
    <AppHeader />
    <slot />
  </v-app>
</template>