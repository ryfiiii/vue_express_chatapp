import { Request, Response } from "express"
import MessageModel from "../models/MessageModel"
import { io } from "../server"
import ValidationService from "../services/ValidationService"

class messageController {
    /**
     * チャット取得
     */
    static async getChats(req: Request, res: Response){
        try {
            const chats = await MessageModel.getAllChats()
            if(!chats){
                return res.json({"error": "チャットの取得に失敗しました"})
            }
            return res.json({"success": chats})

        }catch(err){
            return res.status(400)
        }
    }

    /**
     * チャット投稿
     */
    static async postChat(req: Request, res: Response){

        try {
            const message = req.body.message

            const validate = ValidationService.chatValidate(message)
            if(!validate){
                return res.json({"error": "メッセージは1~250字で日本語・英語・英数字のみ使用できます"})
            }

            if(!req.session.user){
                return res.json({"error": "セッションが存在しません"})
            }
    
            const chat = await MessageModel.createChat(req.session.user.id, message)
            if(!chat){
                return res.json({"error": "チャットの作成に失敗しました"})
            }
    
            //socket.ioを使用して、フロント側でチャットを再取得・表示
            const chats = await MessageModel.getAllChats()
            if(!chats){
                return res.json({"error": "チャットの取得に失敗しました"})
            }
    
            io.emit("chat message", chats)
            res.json({"success": chat})

        }catch(error){
            return res.status(400)
        }
    }
}

export default messageController