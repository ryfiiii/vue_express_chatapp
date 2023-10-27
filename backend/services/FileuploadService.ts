import { Request, Response } from "express"
import fileUpload, { UploadedFile } from "express-fileupload"

class FileUploadService {
    static async uploadAvatar(req: Request, res: Response): Promise<string | null> {
        if (!req.files || Object.keys(req.files).length === 0) {
            return null;
        }

        let avatar = req.files.avatar as UploadedFile;

        let uploadPath = __dirname + '/uploads/icon/' + avatar.name;

        await avatar.mv(uploadPath, (err) => {
            if (err) return null;
        });

        return uploadPath;
    }
}

export default FileUploadService;