import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class UserModel {
    static createUser(name: string, avatar: string){
        const user = prisma.user.create({
            data: {
                name: name,
                avatar: avatar
            }
        })

        return user
    }
}

export default UserModel