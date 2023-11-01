import { Request, Response } from "express"

class ValidationService {

    static userValidate(req: Request, res: Response): boolean{

        const username = req.body.username
        const usernamePattern = /^[A-Za-z0-9\u3040-\u309F\u30A0-\u30FF\uFF00-\uFF9F]{1,20}$/

        if(username == "" || !usernamePattern.test(username)){
            return false
        }

        return true
    }

    static chatValidate(chat: string): boolean{

        const chatPattern = /^[A-Za-z0-9\u3040-\u309F\u30A0-\u30FF\uFF00-\uFF9F！？!?]{1,250}$/

        if(chat == "" || !chatPattern.test(chat)){
            return false
        }

        return true
    }
}

export default ValidationService