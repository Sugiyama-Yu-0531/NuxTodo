<script setup lang="ts">
import { deleteDoc, doc, getFirestore, updateDoc } from '@firebase/firestore';
import Card from '~/components/Card.vue';
import { type TaskList } from '~/types/taskList';

const props = defineProps({
  taskList: {type: Array<TaskList>, required: true},
})

const { openMessageBox } = useMessageBox();

// 削除
const deleteTask = async (id: string) => {
  openMessageBox('対象のタスクを削除しますか？', async () => {
    const db = getFirestore();
    await deleteDoc(doc(db, 'tasks', id));

    alert('対象のタスクを削除しました');
  });
}

// 重要化/重要化解除
const changeFlag = async (id: string, important: boolean) => {
  const db = getFirestore();
  await updateDoc(doc(db, 'tasks', id), {
    isImportant: !important,
  });
}

// 完了/未完了
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
            <v-tooltip text="削除" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-delete"
                  density="compact"
                  variant="text"
                  @click="deleteTask(item.id)"
                />
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="auto" class="pa-0 pl-1">
            <v-tooltip
              :text="item.isCompleted ? '未完了に戻す' : '完了にする'"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-check"
                  density="compact"
                  variant="text"
                  :color="item.isCompleted ? 'success' : ''"
                  @click="changeComplete(item.id, item.isCompleted)"
                />
              </template>
            </v-tooltip>
          </v-col>
          <v-col cols="auto" class="pa-0 pl-1">
            <v-tooltip
              :text="item.isImportant ? '重要リストから外す' : '重要リストに追加'"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-flag-variant"
                  density="compact"
                  variant="text"
                  :color="item.isImportant ? 'red' : ''"
                  @click="changeFlag(item.id, item.isImportant)"
                />
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </Card>
    </div>
  </div>
</template>