<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { menuList } from '~/constants/menu';

const auth = useAuth();
const drawer = ref<boolean>(false);

const handleDrawer = () => {
  drawer.value = !drawer.value;
}
</script>

<template>
  <v-app-bar color="blue" height="52">
    <v-row class="ma-0 pr-6" justify="space-between" align="center">
      <v-col class="pa-0" cols="auto">
        <v-btn :icon="!drawer ? 'mdi-menu' : 'mdi-close'" @click="handleDrawer"/>
      </v-col>
      <v-col class="pa-0 pl-4">
        <span>NuxTodo</span>
      </v-col>
      <v-col class="pa-0" cols="auto">
        <span>{{ auth.user.value?.email }}</span>
      </v-col>
      <v-col class="pa-0 pl-4" cols="auto">
        <v-btn variant="outlined" @click="auth.signOut">サインアウト</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list-item
      v-for="(item, i) in menuList"
      :key="i"
      :title="item.title"
      :to="item.to"
      variant="flat"
    />
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
:deep(.v-navigation-drawer__content) {
  padding-top: 16px;
}
</style>