<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

const email = ref<string>('');
const password = ref<string>('');
const auth = useAuth();

const login = async (): Promise<void> => {
  await auth.signIn(email.value, password.value);
  if (auth.token.value) navigateTo('/');
}
</script>

<template>
  <PageBase page-title="ログイン">
    <v-container>
      <Card>
        <label>メールアドレス<input type="text" v-model="email" placeholder="email" name="email" /></label>
        <label>パスワード<input type="password" v-model="password" placeholder="password" name="password" /></label>
        <button @click="login">Sign In</button>
      </Card>
    </v-container>
  </PageBase>
</template>