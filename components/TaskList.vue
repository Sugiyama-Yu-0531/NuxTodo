<script setup lang="ts">
import { deleteDoc, doc, getFirestore, updateDoc } from '@firebase/firestore';
import Card from '~/components/Card.vue';
import { type TaskList } from '~/types/taskList';

const props = defineProps({
  taskList: {type: Array<TaskList>, required: true},
})

const deleteTask = async (id: string) => {
  const db = getFirestore();
  await deleteDoc(doc(db, 'tasks', id));
  // alert('対象のタスクを削除しました');
}

const changeFlag = async (id: string, important: boolean) => {
  const db = getFirestore();
  await updateDoc(doc(db, 'tasks', id), {
    isImportant: !important,
  });
}

const changeComplete = async (id: string, complete: boolean) => {
  const db = getFirestore();
  await updateDoc(doc(db, 'tasks', id), {
    isCompleted: !complete,
  })
}

</script>

<template>
  <div class="d-flex flex-column">
    <div v-for="item in props.taskList" :key="item.id" class="pb-2">
      <Card :title="item.title" :subtitle="item.remarks">
        <v-row class="ma-0" justify="space-between" align="end">
          <v-col class="pa-0">
            <span>{{ `期限：${item.date}` }}</span>
          </v-col>
          <v-col cols="auto" class="pa-0">
            <v-btn icon="mdi-delete" density="compact" variant="text" @click="deleteTask(item.id)" />
          </v-col>
          <v-col cols="auto" class="pa-0 pl-1">
            <v-btn icon="mdi-check" density="compact" variant="text" @click="changeComplete(item.id, item.isCompleted)"/>
          </v-col>
          <v-col cols="auto" class="pa-0 pl-1">
            <v-btn
              icon="mdi-flag-variant"
              density="compact"
              variant="text"
              :color="item.isImportant ? 'red' : ''"
              @click="changeFlag(item.id, item.isImportant)"
            />
          </v-col>
        </v-row>
      </Card>
    </div>
  </div>
</template>