import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"
import path from 'path'

class FileUploadService {
    static uploadAvatar(req: Request, res: Response): string | null {
        let file = req.files?.avatar as UploadedFile

        if(!file){
            return null
        }

        const uploadPath = path.join(__dirname, '..', 'uploads/icons', file.name)

        file.mv(uploadPath, (err) => {
            console.error(err)
            return null
        })

        return uploadPath
    }
}

export default FileUploadService