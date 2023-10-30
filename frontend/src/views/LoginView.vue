<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
            <div>
                <h1 class="mb-4 text-2xl font-extrabold text-center text-gray-900">
                    Login
                </h1>
                <input 
                    type="text" 
                    v-model="username" 
                    placeholder="Username" 
                    class="w-full p-2 border border-gray-300 rounded-md outline-none text-gray-600 focus:border-indigo-300" 
                />
                <div class="mt-4 relative">
                    <label 
                        class="block w-full p-2 border border-gray-300 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 text-center"
                    >
                        <span class="text-base leading-normal">アイコン写真を選択</span>
                        <input 
                            type="file" 
                            ref="fileInput" 
                            class="absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full"
                        />
                    </label>
                </div>
                <div class="mt-4">
                    <button 
                        class="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-700" 
                        @click="uploadFile"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits()

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
        emit("login")
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

const sessionCheck = async () => {
    const res = await axios.get("http://localhost:3000/check-login-session", { withCredentials: true })
    console.log(res)
}

const sessionDelete = async () => {
    const res = await axios.get("http://localhost:3000/delete-session", { withCredentials: true })
    console.log(res)
}
</script>