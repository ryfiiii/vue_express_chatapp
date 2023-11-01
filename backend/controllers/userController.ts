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
            const avatar = FileUploadService.uploadAvatar(req, res)
            if(!avatar){
                return res.json({"error": "ファイルのアップロードに失敗しました"})
            }
    
            const user = await UserModel.createUser(req.body.username, avatar)
            if(!user){
                return res.json({"error": "データベースの登録に失敗しました"})
            }
    
            const createSes = SessionService.createSession(user.id, req, res, avatar)
            if(!createSes){
                return res.json({"error": "セッションの作成に失敗しました"})
            }
    
            return res.json({"success": "セッションを作成しました!"})

        }catch(error){
            return res.status(400)
        }
    }

    /**
     * ログインチェックメソッド
     */
    static checkLoginSession (req: Request, res: Response) {

        if(req.session.user) {
            return res.json({"user": req.session.user})
        }else{
            return res.json({"user": null})
        }
    }

    /**
     * ログアウトメソッド
     */
    static logout (req: Request, res: Response) {
        const del = SessionService.deleteSession(req, res)
        if(del) {
            return res.json({"success": "セッションを削除しました。"})
        }else {
            return res.json({"error": "セッションの削除に失敗しました。"})
       }
    }
}

export default userController