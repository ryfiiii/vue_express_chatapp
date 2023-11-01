<template>
    <div class="max-w-3xl mx-auto">
        <div class="bg-gray-600 py-5 relative">
            <p class="text-2xl text-white text-center">{{ loginUser.name }}</p>
            <button class="absolute top-6 left-5 text-white hover:underline" @click="logout">ログアウト</button>
        </div>
        <div class="bg-blue-200">
            <div class="p-4 flex flex-col space-y-4">
                <div class="max-h-650 overflow-x-auto" ref="chatArea">
                    <div v-for="chat in chats" :key="chat.id">
                        <div v-if="chat.user.id === loginUser.id" class="flex items-start justify-end">
                            <div class="flex flex-col items-end">
                                <p>{{ chat.user.name }}</p>
                                <div class="flex items-center space-x-2">
                                    <span class="text-xs text-gray-500">{{ formatDate(chat.created_at) }}</span>
                                    <p class="bg-green-500 text-black max-w-xs rounded-lg p-2">{{ chat.message }}</p>
                                </div>
                            </div>
                            <img :src="'http://localhost:3000/' + chat.user.avatar" alt="avatar" class="w-10 h-10 rounded-full ml-2 object-cover">
                        </div>
                        <div v-else class="flex items-start">
                            <img :src="'http://localhost:3000/' + chat.user.avatar" alt="avatar" class="w-10 h-10 rounded-full mr-2 object-cover">
                            <div class="flex flex-col items-start">
                                <p>{{ chat.user.name }}</p>
                                <div class="flex items-center space-x-2">
                                    <p class="bg-gray-300 max-w-xs rounded-lg p-2">{{ chat.message }}</p>
                                    <span class="text-xs text-gray-500">{{ formatDate(chat.created_at) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-between items-center mt-4 p-4">
                    <input type="text" v-model="message" :placeholder="errorMessage"
                        class="flex-grow border rounded-lg p-4  mr-2 focus:outline-none focus:border-blue-300" />
                    <button @click="sendChat"
                        class="bg-blue-500 text-white rounded-xl py-4 px-5 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import io from "socket.io-client"
import dayjs from "dayjs"

//props
const props = defineProps({
    loginUser: {
        type: Object,
        required: false,
        default: () => ({
            id: null,
            name: null,
            avatar: null,
        })
    }
})

//エミット
const emit = defineEmits()

//エラー文
const errorMessage = ref<string>("メッセージを入力")

//チャット取得
const chats = ref<any>([])
const getChats = async () => {
    try{
        const res = await axios.get("http://localhost:3000/get-chats")
        if(res.data.success){
            chats.value = res.data.success

        }else if(res.data.error){
            console.log(res.data.error)
        }

    }catch(error){
        console.error(error)
    } 
}

//チャット送信
const message = ref<string>("")
const sendChat = async () => {
    try{
        const res = await axios.post("http://localhost:3000/post-chat", { message: message.value }, { withCredentials: true })
        if(res.data.success){
            message.value = ""
            errorMessage.value = "メッセージを入力"

        }else if(res.data.error){
            message.value = ""
            errorMessage.value = res.data.error
            console.error(res.data.error)
        }

    }catch(error){
        console.error(error)
    }
}

//ログアウト
const logout = async () => {
    try{
        const res = await axios.get("http://localhost:3000/delete-session", { withCredentials: true })
        if(res.data.success){
            emit("logout")

        }else if(res.data.error){
            console.error(res.data.error)
        }

    }catch(error){
        console.error(error)
    }
}

//日時フォーマット
const formatDate = (date: string) => {
    return dayjs(date).format("MM/DD HH:mm")
}

//socket.io-clientの設定
const socket = io("http://localhost:3000")

onMounted(() => {
    getChats()

    socket.on("chat message", (messages) => {
        chats.value = messages
        scrollToBottom()
    })
}),

onUnmounted(() => {
    socket.disconnect()
})

//下にスクロール
const chatArea = ref<any>(null)

const scrollToBottom = () => {
    nextTick(() => {
        if(chatArea.value){
            chatArea.value.scrollTop = chatArea.value.scrollHeight
        }
    })
}
</script>