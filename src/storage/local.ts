
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {type Request} from 'express';

class UploadLocal {
	private readonly url: string = path.resolve('./src/storage/local');

	constructor() { }

	private storage(): multer.StorageEngine {
		return multer.diskStorage({
			destination: (
				request: Request,
				file: Express.Multer.File,
				cb: any,
			) => {
				if (!fs.existsSync(this.url)) {
					fs.mkdirSync(this.url);
				}

				cb(null, this.url);
			},

			filename(
				request: Request,
				file: Express.Multer.File,
				cb: any,
			) {
				const type = file.mimetype.split('/')[1];

				cb(null, `${new Date().getTime()}.${type}`);
			},
		})
	}

	private fileFilter() {
		return (
			request: Request,
			file: Express.Multer.File,
			cb: multer.FileFilterCallback,
		) => {
			const type = file.mimetype.split('/')[1];
			const conditions = ['png', 'jpg', 'jpeg'];
			if (conditions.includes(`${type}`)) {
				cb(null, true);
			}

			cb(null, false);
		};
	}

	get getConfig() {
		return multer({
			storage: this.storage(),
			fileFilter: this.fileFilter(),
		});
	}
}

export const uploadLocal = new UploadLocal();