import express from "express"
import userController from "../controllers/userController"
import messageController from "../controllers/messageController"

const router = express.Router()

//認証
router.post("/create-login-session", userController.createLoginSession)
router.get("/check-login-session", userController.checkLoginSession)
router.get("/delete-session", userController.logout)

//チャット
router.get("/get-chats", messageController.getChats)
router.post("/post-chat", messageController.postChat)

export default router