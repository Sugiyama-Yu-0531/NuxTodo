<script setup lang="ts">
const props = defineProps({
  pageTitle: {type: String, required: true}
})
</script>

<template>
  <v-main>
    <div class="page-base__header">
      <v-row class="ma-0" align="center">
        <v-col class="pa-0 pl-4">
          <span class="page-title"> {{ props.pageTitle }}</span>
        </v-col>
      </v-row>
      <v-divider />
    </div>
    <slot />
  </v-main>
</template>

<style scoped lang="scss">
.page-base {
  &__header {
    height: 58px;
    top: 52px;
    position: sticky;
    z-index: 2;
    background-color: #fff;
  }
}

.page-title {
  font-size: 24px;
  line-height: 58px;
}
</style>