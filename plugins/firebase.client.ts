import { initializeApp } from 'firebase/app'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: "AIzaSyDoHWdJu-9TW8NaGQQAxJsuBcmjV-N_ctM",
    authDomain: "nuxtodo-5cf8b.firebaseapp.com",
    projectId: "nuxtodo-5cf8b",
    storage_bucket: "nuxtodo-5cf8b.appspot.com",
    messaging_sender_id: "656760795224",
    api_id: "1:656760795224:web:d4ea3c1e673a2ee1e29a2d",
  };

  initializeApp(firebaseConfig);
})