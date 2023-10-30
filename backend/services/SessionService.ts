import { Request, Response } from "express"

class SessionService {
    /**
     * userセッション作成メソッド
     */
    static createSession(id: number, req: Request, res: Response, avatar: string): boolean{
        const name: string = req.body.username

        req.session.user = {
            id: id,
            name: name,
            avatar: avatar
        }

        if(req.session.user){
            return true
        }else {
            return false
        }
    }

    /**
     * userセッション確認メソッド
     */
    static checkSession(req: Request, res: Response): boolean{
        if(req.session.user){
            return true

        }else{
            return false
        }
    }

    /**
     * userセッション破棄メソッド
     */
    static deleteSession(req: Request, res: Response): Boolean{
        req.session.destroy((err) => {
            if(err){
                return false
            }
        })
        return true
    }
}

export default SessionService