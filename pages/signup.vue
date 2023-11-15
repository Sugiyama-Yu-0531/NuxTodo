<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

const email = ref<string>('');
const password = ref<string>('');
const auth = useAuth();

</script>

<template>
  <PageBase page-title="ユーザー登録">
    <v-container>
      <Card>
        <label>メールアドレス<input type="text" v-model="email" placeholder="email" name="email" /></label>
        <label>パスワード<input type="password" v-model="password" placeholder="password" name="password" /></label>
        <button @click="auth.signUp">Sign Up</button>
      </Card>
    </v-container>
  </PageBase>
</template>