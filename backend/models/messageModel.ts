import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class MessageModel {
    /**
     * Post全件取得メソッド
     */
    static getAllChats(){
        const chats = prisma.post.findMany()
        return chats
    }

    /**
     * Post作成メソッド
     */
    static createChat(id: number, message: string){
        const chat = prisma.post.create({
            data: {
                userId: id,
                message: message
            }
        })
        return chat
    }
}

export default MessageModel