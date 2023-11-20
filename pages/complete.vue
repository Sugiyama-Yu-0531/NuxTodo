<script setup lang="ts">
import PageBase from '~/components/PageBase.vue';
import TaskList from '~/components/TaskList.vue';
import {
  type TaskList as TaskListType,
  type NoIdTaskList
} from '~/types/taskList';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

definePageMeta({
  middleware: ['auth']
})

const auth = useAuth();
const taskList = ref<TaskListType[]>([])

onMounted(async () => {
  const db = getFirestore();
  const q = query(collection(db, 'tasks'), where('userId', '==', auth.user.value?.uid), where('isCompleted', '==', true), orderBy('date'));

  onSnapshot(q, (querySnapshot) => {
    taskList.value = [];
    querySnapshot.forEach((doc) => {
      taskList.value.push({id: doc.id, ...doc.data() as NoIdTaskList})
    });
  })
});

</script>

<template>
  <PageBase page-title="完了タスクリスト">
    <v-container>
      <TaskList :task-list="taskList"/>
    </v-container>
  </PageBase>
</template>