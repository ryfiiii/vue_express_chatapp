import { Request, Response } from "express"

class SessionService {
    /**
     * userセッション作成メソッド
     * @param req 
     * @param res 
     * @returns true
     */
    static createSession(req: Request, res: Response, avatar: string){
        const name: string = req.body.name

        req.session.user = {
            name: name,
            avatar: avatar
        }

        return true
    }
}

export default SessionService