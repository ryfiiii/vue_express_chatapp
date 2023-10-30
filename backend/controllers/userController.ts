import { Request, Response } from "express"
import SessionService from "../services/SessionService"
import FileUploadService from "../services/FileuploadService"
import UserModel from "../models/UserModel"

class userController {
    /**
     * ユーザー新規作成
     */
    static createLoginSession (req: Request, res: Response) {
        //validation処理実装する

        try {
            const avatar = FileUploadService.uploadAvatar(req, res)
            if(!avatar){
                return res.status(400).json({"error": "ファイルのアップロードに失敗しました"})
            }
    
            const user = UserModel.createUser(req.body.username, avatar) //明日async awaitつける
    
            const createSes = SessionService.createSession(user.id, req, res, avatar)
            if(!createSes){
                return res.status(400).json({"error": "セッションの作成に失敗しました"})
            }
    
            return res.status(200).json({"success": "セッションを作成しました!"})

        }catch(error){
            return res.status(400).json({"error": error})
        }
    }

    /**
     * ログインチェックメソッド
     */
    static checkLoginSession (req: Request, res: Response) {
        const user = req.session.user

        if(user) {
            return res.status(200).json({"user": user})
        }else{
            return res.status(200).json({"user": null})
        }
    }

    /**
     * ログアウトメソッド
     */
    static logout (req: Request, res: Response) {
        const del = SessionService.deleteSession(req, res)
        if(del) {
            return res.status(200).json({"message": "セッションを削除しました。"})
        }else {
            return res.status(400).json({"error": "セッションの削除に失敗しました。"})
       }
    }
}

export default userController