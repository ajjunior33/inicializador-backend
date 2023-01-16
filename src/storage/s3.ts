import multer from 'multer';
import { type Request } from 'express';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';

class UploadCloud {
	constructor() { }

	private storage(): multer.StorageEngine {
		return multerS3({
			bucket: 'devmeraki',
			s3: new S3Client({
				region: 'us-east-1',
				endpoint: 'https://devmeraki.nyc3.digitaloceanspaces.com',
				credentials: {
					accessKeyId: 'DO00N6CNAAANC42PN2NU',
					secretAccessKey: 'UG6cIs9IaUnp/3VIct5n0Hjvs0Te8Eea/6YPKJkHfD4'
				},
			}),
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
			fileFilter: this.fileFilter(),
		});
	}
}

export const uploadCloud = new UploadCloud();