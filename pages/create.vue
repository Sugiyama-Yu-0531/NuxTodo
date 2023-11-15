<script setup lang="ts">
import PageBase from '~/components/PageBase.vue';
import Card from '~/components/Card.vue';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";

definePageMeta({
  middleware: ['auth']
})

const title = ref<string>('');
const remarks = ref<string>('');
const date = ref<string>('');
const pickerData = ref<Date>();
const dialog = ref<boolean>(false);
const auth = useAuth();

const onChangePicker = (dateValue?: Date) => {
  if (!dateValue) {
    dialog.value = false;
    return;
  }

  date.value = format(dateValue, 'yyyy/MM/dd');
  dialog.value = false;
}

const handleSubmit = async () => {
  const db = getFirestore();

  await addDoc(collection(db, 'tasks'), {
    id: uuidv4(),
    userId: auth.user.value?.uid,
    title: title.value,
    date: date.value,
    remarks: remarks.value,
    isDeleted: false,
    isCompleted: false,
    isImportant: false,
  });

  alert('追加しました！')
}

</script>

<template>
  <PageBase page-title="新規作成">
    <v-container>
      <Card>
        <div class="title-field pb-2">
          <v-text-field
            v-model="title"
            label="タイトル"
            variant="outlined"
            class="shrink"
            clearable
          />
        </div>
        <div class="pb-2">
          <v-textarea
            v-model="remarks"
            label="備考"
            variant="outlined"
            clearable
            type="textarea"
          />
        </div>

        <v-text-field
          v-model="date"
          @click="() => dialog = true"
          variant="outlined"
          label="期限日"
        />
        <v-dialog v-model="dialog" width="360" max-width="unset">
          <v-date-picker
            v-model="pickerData"
            @update:modelValue="onChangePicker(pickerData)"
          />
        </v-dialog>
        <v-btn @click="handleSubmit" variant="outlined">作成</v-btn>
      </Card>
    </v-container>
  </PageBase>
</template>

<style scoped lang="scss">
.title-field {
  max-width: 400px;
}


</style>