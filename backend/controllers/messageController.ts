import { Request, Response } from "express"
import MessageModel from "../models/MessageModel"
import { io } from "../server"

class messageController {
    /**
     * チャット取得
     */
    static async getChats(req: Request, res: Response){
        try {
            const chats = await MessageModel.getAllChats()
            return res.status(200).json(chats)

        }catch(err){
            return res.status(400).json({"error": "Chatの取得に失敗しました。"})
        }
    }

    /**
     * チャット投稿
     */
    static async postChat(req: Request, res: Response){
        //チャットをバリデーション
        //適切なエラーハンドリングを実装する
        
        const message = req.body.message
        //チャット送信者とチャットををDBに保存
        if(!req.session.user){
            return res.status(400).json({error: "セッションが存在しません"})
        }

        const chat = await MessageModel.createChat(req.session.user.id, message)
        //socket.ioを使用して、フロント側でチャットを再取得・表示
        const chats = await MessageModel.getAllChats()
        io.emit("chat message", chats)
        res.status(200).json({chat: chat})
    }
}

export default messageController