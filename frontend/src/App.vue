<template>
  <div>
    <Chat v-if="user.name" @logout="sessionCheck" />
    <Login v-else @login="sessionCheck" />
  </div>
</template>

<script setup lang="ts">
import Login from "@/views/LoginView.vue"
import Chat from "@/views/ChatView.vue"

import { onMounted, reactive,} from "vue";
import axios from "axios";

let user = reactive({
  name: null,
  avatar: null,
})

const sessionCheck = async () => {
  const res = await axios.get("http://localhost:3000/check-login-session", {withCredentials: true})
  if (res.data.user) {
    user.name = res.data.user.name
    user.avatar = res.data.user.avatar
  }else {
    user.name = null
    user.avatar = null
  }
  console.log(user.name)
}

onMounted(() => {
  sessionCheck()
})
</script>