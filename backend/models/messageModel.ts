import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class MessageModel {
    /**
     * Post全件取得メソッド
     */
    static async getAllChats(){
        const chats = await prisma.post.findMany({
            include: {
                user: true,
            }
        })
        return chats
    }

    /**
     * Post作成メソッド
     */
    static async createChat(id: number, message: string){
        const chat = await prisma.post.create({
            data: {
                userId: id,
                message: message
            }
        })
        return chat
    }
}

export default MessageModel