import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class UserModel {
    static async createUser(name: string, avatar: string){
        const user = await prisma.user.create({
            data: {
                name: name,
                avatar: avatar
            }
        })

        return user
    }
}

export default UserModel