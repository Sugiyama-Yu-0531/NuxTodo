<script setup lang="ts">
import PageBase from '~/components/PageBase.vue';
import Card from '~/components/Card.vue';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import {
  getFirestore,
  doc,
  setDoc
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
const { openMessageBox } = useMessageBox();

const onChangePicker = (dateValue?: Date) => {
  if (!dateValue) {
    dialog.value = false;
    return;
  }

  date.value = format(dateValue, 'yyyy/MM/dd');
  dialog.value = false;
}

const handleSubmit = async () => {
  openMessageBox(`入力した内容で\nタスクを作成しますか？`, async () => {
    if (!title.value || !date) {
      alert('必須項目を入力してください')
      return;
    }

    const db = getFirestore();
    const uuid = uuidv4();

    await setDoc(doc(db, 'tasks', uuid), {
      id: uuid,
      userId: auth.user.value?.uid,
      title: title.value,
      date: date.value,
      remarks: remarks.value,
      isCompleted: false,
      isImportant: false,
    });
  })
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
            :rules="[(value) => {
              return !!value ? true : 'この項目は必須入力です'
            }]"
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
          :rules="[(value) => {
              return !!value ? true : 'この項目は必須入力です'
            }]"
          clearable
        />
        <v-dialog v-model="dialog" width="360" max-width="unset">
          <v-date-picker
            v-model="pickerData"
            @update:modelValue="onChangePicker(pickerData)"
          />
        </v-dialog>
        <v-btn class="mt-4" @click="handleSubmit" variant="outlined" color="primary">作成</v-btn>
      </Card>
    </v-container>
  </PageBase>
</template>

<style scoped lang="scss">
.title-field {
  max-width: 400px;
}


</style>