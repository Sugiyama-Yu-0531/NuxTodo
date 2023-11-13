<script setup lang="ts">
import PageBase from '~/components/PageBase.vue';
import Card from '~/components/Card.vue';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

// ログインしてなければリダイレクトするやーつ
definePageMeta({
  middleware: ['auth']
})

const title = ref<string>('');
const remarks = ref<string>('');
const date = ref();
const dialog = ref<boolean>(false);

const {addList} = useTaskList();

const handleSubmit = () => {
  addList({
    id: uuidv4(),
    title: title.value,
    date: format(date.value, 'yyyy/MM/dd'),
    remarks: remarks.value,
    isDeleted: false,
    isCompleted: false,
  })

  console.log(format(date.value, 'yyyy/MM/dd'))
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
          :value="!date ? '' :format(new Date(date), 'yyyy/MM/dd')"
          @click="() => dialog = true"
          variant="outlined"
          label="期限日"
        />
        <v-dialog v-model="dialog">
          <v-date-picker
            width="350"
            v-model="date"
            @update:modelValue="dialog=false"
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