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
    <v-row class="ma-0" justify="space-between" align="center">
      <v-col class="pa-0" cols="auto">
        <v-btn :icon="!drawer ? 'mdi-menu' : 'mdi-close'" @click="handleDrawer"/>
      </v-col>
      <v-col class="pa-0 pl-4">
        <span>NuxTodo</span>
      </v-col>
      <v-col class="pa-0" cols="auto">
        <span>{{ auth.user.value?.email?.replace('@gmail.com', '') }}</span>
      </v-col>
      <v-col class="pa-0 pl-2" cols="auto">
        <v-tooltip text="サインアウト" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-logout"
              @click="auth.signOut"
            />
          </template>
        </v-tooltip>
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