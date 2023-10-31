<template>
  <div>
    <Chat v-if="user.name" @logout="sessionCheck" :loginUser="user" />
    <Login v-else @login="sessionCheck" />
  </div>
</template>

<script setup lang="ts">
import Login from "@/views/LoginView.vue"
import Chat from "@/views/ChatView.vue"

import { onMounted, ref,} from "vue";
import axios from "axios";

let user = ref({
  id: null,
  name: null,
  avatar: null,
})

//セッション保有確認メソッド
const sessionCheck = async () => {
  const res = await axios.get("http://localhost:3000/check-login-session", {withCredentials: true})
  if (res.data.user) {
    user.value.id = res.data.user.id
    user.value.name = res.data.user.name
    user.value.avatar = res.data.user.avatar
  }else {
    user.value.id = null
    user.value.name = null
    user.value.avatar = null
  }
  console.log(user)
}

//ページ表示時にセッションがあるか確認
onMounted(() => {
  sessionCheck()
})
</script>