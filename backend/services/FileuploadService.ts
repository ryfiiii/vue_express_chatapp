import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"
import path from 'path'

class FileUploadService {
    static uploadAvatar(req: Request, res: Response): string | null {
        let file = req.files?.avatar as UploadedFile

        if(!file){
            return null
        }

        const uploadDir = "uploads/icons"

        const uploadPath = path.join(__dirname, '..', uploadDir, file.name)

        file.mv(uploadPath, (err) => {
            console.error(err)
            return null
        })

        return path.join(uploadDir, file.name)
    }
}

export default FileUploadService