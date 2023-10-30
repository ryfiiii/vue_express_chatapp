import express from "express"
import userController from "../controllers/userController"

const router = express.Router()

router.post("/create-login-session", userController.createLoginSession)
router.get("/check-login-session", userController.checkLoginSession)
router.get("/delete-session", userController.logout)

export default router