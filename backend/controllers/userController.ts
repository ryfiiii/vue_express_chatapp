import { Request, Response } from "express"
import SessionService from "../services/SessionService"
import FileUploadService from "../services/FileuploadService"
import UserModel from "../models/UserModel"

class userController {
    /**
     * ユーザー新規作成
     */
    static async createLoginSession (req: Request, res: Response) {
        //validation処理実装する

        try {
            const avatar = await FileUploadService.uploadAvatar(req, res)
            if(!avatar){
                return res.status(400).json({"error": "ファイルのアップロードに失敗しました"})
            }
    
            const user = UserModel.createUser(req.body.username, avatar)
    
            SessionService.createSession(req, res, avatar)
    
            return res.status(200)

        }catch(error){
            return res.status(400).json({"error": error})
        }
    }

    /**
     * ログインチェックメソッド
     */
    static checkLoginSession (req: Request, res: Response) {
        const check = SessionService.checkSession(req, res)
        if(!check){
            return res.status(400)
        }
        return res.status(200).json({user: req.session.user})
    }

    /**
     * ログアウトメソッド
     */
    static logout (req: Request, res: Response) {
        SessionService.deleteSession(req, res)
        return res.status(200)
    }
}

export default userController