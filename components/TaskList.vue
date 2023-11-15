<script setup lang="ts">
import Card from '~/components/Card.vue';
import { type TaskList } from '~/types/taskList';
defineProps({
  taskList: {type: Array<TaskList>, required: true},
})

</script>

<template>
  <div class="d-flex flex-column">
    <div v-for="item in taskList" :key="item.id" class="pb-2">
      <Card :title="item.title" :subtitle="item.remarks">
        <v-row class="ma-0" justify="space-between" align="end">
          <v-col class="pa-0">
            <span>{{ `期限：${item.date}` }}</span>
          </v-col>
          <v-col cols="auto" class="pa-0">
            <v-btn icon="mdi-delete" density="compact" variant="flat" @click="() => {}" />
          </v-col>
          <v-col cols="auto" class="pa-0 pl-1">
            <v-btn icon="mdi-check" density="compact" variant="flat" />
          </v-col>
          <v-col cols="auto" class="pa-0 pl-1">
            <v-btn icon="mdi-flag-variant" density="compact" variant="flat" />
          </v-col>
        </v-row>
      </Card>
    </div>
  </div>
</template>