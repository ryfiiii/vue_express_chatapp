import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class UserModel {
    static async createUser(name: string, avatar: string){
        try {
            const user = await prisma.user.create({
                data: {
                    name: name,
                    avatar: avatar
                }
            })
            return user

        }catch(error){
            return null
        }


    }
}

export default UserModel