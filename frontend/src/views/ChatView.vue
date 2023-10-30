<template>
    <div>
        <h1>Chat</h1>
        <button @click="logout" class="btn btn-primary">Logout</button>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';

const emit = defineEmits()

const logout = async () => {
  const res = await axios.get("http://localhost:3000/delete-session", {withCredentials: true})
  console.log(res)
  emit("logout")
}
</script>