import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class MessageModel {
    /**
     * Post全件取得メソッド
     */
    static async getAllChats(){
        try{
            const chats = await prisma.post.findMany({
                include: {
                    user: true,
                }
            })
            return chats

        }catch(error){
            return null
        }
    }

    /**
     * Post作成メソッド
     */
    static async createChat(id: number, message: string){
        try{
            const chat = await prisma.post.create({
                data: {
                    userId: id,
                    message: message
                }
            })
            return chat

        }catch(error){
            return null
        }
    }
}

export default MessageModel