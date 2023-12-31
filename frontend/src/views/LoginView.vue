<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
            <div>
                <h1 class="mb-4 text-2xl font-extrabold text-center text-gray-900">
                    Login
                </h1>
                <div v-if="errorMessage">
                    <p class="text-center text-red-400 mb-2">※{{ errorMessage }}</p>
                </div>
                <input type="text" v-model="username" placeholder="Username"
                    class="w-full p-2 border border-gray-300 rounded-md outline-none text-gray-600 focus:border-indigo-300" />
                <div class="mt-4 relative">
                    <label class="block w-full p-2 border border-gray-300 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 text-center">
                        <span class="text-base leading-normal">{{ fileName || 'アイコン写真を選択'}}</span>
                        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/png, image/jpeg"
                        class="absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full" />
                    </label>
                </div>
                <div class="mt-4">
                    <button 
                        class="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-700"
                        @click="uploadFile">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

//App.vueのセッション確認メソッド起動用
const emit = defineEmits()

//アップロードしたファイルをサーバーへ送信
const username = ref<string>('')
const fileInput = ref<HTMLInputElement | null>(null)
const errorMessage = ref<string>('')

const uploadFile = async () => {
    if (!fileInput.value?.files?.length || !username.value) {
        errorMessage.value = "空のフィールドが存在します"
        return
    }

    const file = fileInput.value.files[0]
    const formData = new FormData()
    formData.append('username', username.value)
    formData.append('avatar', file)

    try {
        const res = await axios.post('http://localhost:3000/create-login-session', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        //レスポンスがsuccessの時だけログイン
        if(res.data.success){
            emit("login")

        }else if(res.data.error){
            errorMessage.value = res.data.error
        }

    }catch(error) {
        console.error(error)
        errorMessage.value = "不明なエラー"
    }
}

//ファイルアップローダーの見た目
const fileName = ref<string>('')
const handleFileUpload = (e: any) => {
    const files = e.target.files
    if(files.length > 0){
        fileName.value = files[0].name
    }
}
</script>