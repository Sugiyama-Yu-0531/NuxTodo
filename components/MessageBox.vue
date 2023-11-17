<script setup lang="ts">
import { useMessageBox } from '~/composables/useMessageBox';

const {isOpen, message, onClickOk} = useMessageBox();

const handleOk = async () => {
  isOpen.value = false;
  await onClickOk.value();
}

</script>

<template>
  <v-dialog v-model="isOpen" width="320">
    <div class="pa-4 dialog-container">
      <div class="pt-4">
        <span class="dialog-container__message">{{ message }}</span>
      </div>

      <v-row class="ma-0 pt-8" justify="center">
        <v-col class="pa-0" cols="auto">
          <v-btn color="primary" @click="handleOk" width="120">OK</v-btn>
        </v-col>
        <v-col class="pa-0 pl-4" cols="auto">
          <v-btn variant="outlined" @click="() => isOpen = false" width="120">キャンセル</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-dialog>
</template>

<style lang="scss">
.dialog-container {
  background-color: #fff;
  text-align: center;
  border-top: 10px solid #1867C0;
  border-radius: 4px;

  &__message {
    font-size: 24px;
    font-weight: 500;
    white-space: pre-wrap;
  }
}
</style>