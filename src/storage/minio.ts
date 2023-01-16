
import crypto from 'crypto';
import {type Request} from 'express';
import multer from 'multer';
import minio from 'minio';
import multerMinIOStorage from 'multer-minio-storage';

class UploadMinio {
	constructor() { }

	private storage(): multer.StorageEngine {
		const minioClient = new minio.Client({
			accessKey: '5GgOupJr15i4xWTb',
			endPoint: 'localhost',
			port: 9000,
			secretKey: '8eZZyTEftXGJi71U7ovJONk1eINpVzfH',
			region: 'us-west-rack-02',
		});

		return multerMinIOStorage({
			minioClient,
			bucket: 'minio-test',
			acl: 'public-read',
			metadata(request: Request, file: Express.Multer.File, cb: any) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				cb(null, {fieldName: file.fieldname});
			},
			key(request: Request, file: Express.Multer.File, cb: any) {
				crypto.randomBytes(16, (err, hash) => {
					const fileName = `${hash.toString('hex')}.${file.originalname}`;
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call
					cb(null, fileName);
				})
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
			fileFilter: this.fileFilter,
		});
	}
}

export const uploadMinio = new UploadMinio();