import { Request, Response } from "express"

class SessionService {
    /**
     * userセッション作成メソッド
     */
    static createSession(req: Request, res: Response, avatar: string){
        const name: string = req.body.name

        req.session.user = {
            name: name,
            avatar: avatar
        }
    }

    /**
     * userセッション確認メソッド
     */
    static checkSession(req: Request, res: Response): Boolean{
        if(req.session.user){
            return true

        }else{
            return false
        }
    }

    /**
     * userセッション破棄メソッド
     */
    static deleteSession(req: Request, res: Response){
        if(req.session.user){
            delete req.session.user
        }
    }
}

export default SessionService