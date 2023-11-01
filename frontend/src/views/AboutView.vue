<template>
  <div>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="file" ref="fileInput" />
    <button @click="uploadFile">Upload</button>
  </div>
  
  <div>
    <button @click="sessionDelete">Delete!</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

const uploadFile = async () => {
  if (!fileInput.value?.files?.length || !username.value) {
    return
  }

  const file = fileInput.value.files[0];
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('avatar', file);

  try {
    const response = await axios.post('http://localhost:3000/create-login-session', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
}

const sessionDelete = async () => {
  const res = await axios.get("http://localhost:3000/delete-session", {withCredentials: true})
}
</script>
