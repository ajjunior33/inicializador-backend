import { Request } from 'express';
import multer, { StorageEngine, Options, FileFilterCallback } from 'multer';
import path from 'path'
import fs from 'fs';
import mime from 'mime';
class UploadLocal {
  private URL: string = path.resolve("./src/storage/local");
  constructor() { }

  private storage(): StorageEngine {
    return multer.diskStorage({
      destination: (request: Request, file: Express.Multer.File, callback: any) => {
        if (!fs.existsSync(this.URL)) {
          fs.mkdirSync(this.URL);
        }
        callback(null, this.URL);
      },
      filename: (request: Request, file: Express.Multer.File, callback: any) => {
        const type = file.mimetype.split('/')[1];
        callback(null, `${new Date().getTime()}.${type}`)
      }
    })
  }

  private fileFilter() {
    return (request: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
      const type = file.mimetype.split('/')[1];
      const acceptsTypes = ["png", "jpg", "jpeg"];

      if (acceptsTypes.includes(`${type}`)) {
        callback(null, true);
      }

      callback(null, false);
    }
  }

  get getConfig(): Options {
    return {
      storage: this.storage(),
      fileFilter: this.fileFilter()
    }
  }
}

export const uploadLocal = new UploadLocal();