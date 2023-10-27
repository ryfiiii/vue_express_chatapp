import { Request, Response } from "express"
import SessionService from "../services/SessionService"
import FileUploadService from "../services/FileuploadService"
import UserModel from "../models/UserModel"

class userController {
    /**
     * ユーザー新規作成
     * @param req 
     * @param res 
     * @returns 
     */
    static async createLoginSession (req: Request, res: Response) {
        //validation処理実装する

        const avatar = await FileUploadService.uploadAvatar(req, res)
        if(!avatar){
            return res.status(400).send("error")
        }

        const user = UserModel.createUser(req.body.username, avatar)

        const sessionResult = SessionService.createSession(req, res, avatar)
        
        return res.status(200)
    }

    //ログイン確認
    static checkLoginSession (req: Request, res: Response) {
        //loginSessionがあるか確認し、レスポンスを返す
    }

    static logout (req: Request, res: Response) {
        //session破棄
        //ホームに遷移
    }
}

export default userController