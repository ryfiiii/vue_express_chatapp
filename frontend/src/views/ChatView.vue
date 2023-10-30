<template>
    <div>
        <h1>Chat</h1>

        <div v-for="chat in chats" :key="chat.id">
            <div v-if="chat.name == session.name">
                <div class="text-end">
                    <p>{{ chat.name }}</p>
                    <p>{{ chat.message }}</p>
                </div>
            </div>
            <div v-else>
                <div class="text-start">
                    <p>{{ chat.name }}</p>
                    <p>{{ chat.message }}</p>
                </div>
            </div>
        </div>

        <form action="" method="post">
            <input type="text" name="chat">
            <input type="submit" value="送信">
        </form>

        <button @click="logout" class="btn btn-primary">Logout</button>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';

let chats = reactive({})
const emit = defineEmits()

const getChats = async () => {
    const res = await axios.get("http://localhost:3000/get-chats")
    chats = res.data
}

const logout = async () => {
  const res = await axios.get("http://localhost:3000/delete-session", {withCredentials: true})
  console.log(res)
  emit("logout")
}
</script>