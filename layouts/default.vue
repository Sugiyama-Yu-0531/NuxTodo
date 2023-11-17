<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';

</script>

<template>
  <v-app>
    <AppHeader />
    <slot />
    <MessageBox />
  </v-app>
</template>