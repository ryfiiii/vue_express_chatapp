// import AppVue from '@/App.vue'
// import ChatView from '@/views/ChatView.vue'
// import LoginView from '@/views/LoginView.vue'
// import axios from 'axios'
// import { createRouter, createWebHistory } from 'vue-router'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: "/chat",
//       name: "Chat",
//       component: ChatView,
//       meta: { requiresAuth: true },
//     },
//     {
//       path: "/",
//       name: "Login",
//       component: LoginView
//     }
//   ]
// })

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     try {
//       const response = await axios.get("http://localhost:3000/check-login-session", { withCredentials: true });
//       const user = response.data.user;
      
//       if (user) {
//         next(); // セッションが存在する場合はそのまま進む
//       } else {
//         next('/'); // セッションが存在しない場合はログインページにリダイレクト
//       }
//     } catch (error) {
//       next('/'); // エラーが発生した場合はログインページにリダイレクト
//     }
//   } else {
//     next(); // requiresAuthがfalseの場合はそのまま進む
//   }
// });

// export default router
