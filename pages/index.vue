<script setup lang="ts">
import PageBase from '~/components/PageBase.vue';
import TaskList from '~/components/TaskList.vue';
import { type TaskList as TaskListType } from '~/types/taskList';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

definePageMeta({
  middleware: ['auth']
})

const auth = useAuth();
const taskList = ref<TaskListType[]>([])

onMounted(async () => {
  taskList.value = [];

  const db = getFirestore();
  const q = query(collection(db, 'tasks'), where('userId', "==", auth.user.value?.uid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    taskList.value.push(doc.data() as TaskListType)
    console.log(doc.id, " => ", doc.data());
  });
})

</script>

<template>
  <PageBase page-title="タスクリスト">
    <v-container>
      <TaskList :task-list="taskList"/>
    </v-container>
  </PageBase>
</template>