<script setup lang="ts">
const sample = [
  {
    title: 'タイトル1',
    date: '2023/12/31',
    remarks: '●●商店で鉛筆を1ダース購入後、×マーケットで卵を買う',
    isDeleted: false,
    isCompleted: false,
  },
  {
    title: 'タイトル2',
    date: '2023/12/31',
    remarks: '●●商店で鉛筆を11212ダース購入後、×マーケットで卵を買う',
    isDeleted: false,
    isCompleted: false,
  },
  {
    title: 'タイトル3',
    date: '2023/12/31',
    remarks: '●●商店で鉛筆を12222ダース購入後、×マーケットで11卵を買う',
    isDeleted: false,
    isCompleted: false,
  }
]
</script>

<template>
  <div class="d-flex flex-column">
    <div v-for="item in sample" class="pb-2">
      <v-card
        :title="item.title"
        :subtitle="item.remarks"
        elevation="3"
      >
        <v-card-text>
          <v-row class="ma-0" justify="space-between" align="end">
            <v-col class="pa-0">
              <span>{{ `期限：${item.date}` }}</span>
            </v-col>
            <v-col cols="auto" class="pa-0">
              <v-btn icon="mdi-delete" density="compact" variant="flat" />
            </v-col>
            <v-col cols="auto" class="pa-0 pl-1">
              <v-btn icon="mdi-check" density="compact" variant="flat" />
            </v-col>
            <v-col cols="auto" class="pa-0 pl-1">
              <v-btn icon="mdi-flag-variant" density="compact" variant="flat" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>