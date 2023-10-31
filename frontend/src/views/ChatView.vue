<template>
    <div class="p-4 flex flex-col space-y-4">
        <div v-for="chat in chats" :key="chat.id" :class="{ 'text-right': chat.user.id === loginUser.id }">
            <div v-if="chat.user.id === loginUser.id" class="flex flex-col items-end">
                <p class="bg-green-500 text-white max-w-xs rounded-lg p-2">{{ chat.message }}</p>
                <span class="text-xs text-gray-500">{{ chat.created_at }}</span>
                <img :src="'http://localhost:3000/' + chat.user.avatar" alt="avatar" class="w-8 h-8 rounded-full mt-2">
            </div>
            <div v-else class="flex flex-col items-start">
                <p class="bg-gray-300 max-w-xs rounded-lg p-2">{{ chat.message }}</p>
                <span class="text-xs text-gray-500">{{ chat.created_at }}</span>
                <img :src="'http://localhost:3000/' + chat.user.avatar" alt="avatar" class="w-8 h-8 rounded-full mt-2">
            </div>
        </div>

        <div class="flex justify-between items-center mt-4">
            <input type="text" v-model="message" class="form-input flex-1 mr-4" placeholder="Type a message">
            <button @click="sendChat" class="btn btn-primary">Send</button>
        </div>
    </div>
    <button @click="logout" class="btn btn-primary">Logout</button>
</template>



<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, onUnmounted } from 'vue'
import io from "socket.io-client"

//props
const props = defineProps({
    loginUser: Object,
})

//取得した全チャット格納
const chats = ref<any>([])

//入力される文字格納
const message = ref("")

//エミット
const emit = defineEmits()

//関数
const getChats = async () => {
    const res = await axios.get("http://localhost:3000/get-chats")
    chats.value = res.data
    console.log(res.data)
}

const sendChat = async () => {
    const res = await axios.post("http://localhost:3000/post-chat", { message: message.value }, { withCredentials: true })
    message.value = ""
    console.log(res.data)
}

const logout = async () => {
    const res = await axios.get("http://localhost:3000/delete-session", { withCredentials: true })
    console.log(res)
    emit("logout")
}

//socket.io-clientの設定
const socket = io("http://localhost:3000")

onMounted(() => {
    getChats()

    socket.on("chat message", (messages) => {
        chats.value = messages
    })
}),

    onUnmounted(() => {
        socket.disconnect()
    })
</script>