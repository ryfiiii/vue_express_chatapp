import { Request, Response } from "express";

class messageController {
    /**
     * チャット取得
     */
    static getChats(req: Request, res: Response){
        //全件取得
        //json形式で渡す
    }

    /**
     * チャット投稿
     */
    static postChat(req: Request, res: Response){
        //チャットをバリデーション
        //チャットを送信者をDBに保存
        //socket.ioを使用して、フロント側でチャットを再取得・表示
    }
}

export default messageController