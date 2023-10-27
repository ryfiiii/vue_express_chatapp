import express from "express"
import userController from "../controllers/userController"

const router = express.Router()

router.post("/create-login-session", userController.createLoginSession)
router.post("/check-login-session", userController.checkLoginSession)

export default router