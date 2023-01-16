import MailSend from '@providers/MailSend';
import {type NextFunction, type Request, type Response, Router} from 'express';
import {uploadCloud} from 'src/storage/s3';
import {uploadLocal} from '../storage/local';
import {uploadMinio} from '../storage/minio';

const testRoutes = Router();

testRoutes.post('/email', async (request: Request, response: Response) => {
	const {email} = request.body as {
		email: string;
	};

	await MailSend.sendMailer({
		context: {},
		email,
		subject: 'Teste de envio de email',
		template: 'Welcome',
	});

	return response.status(200).json({
		message: 'Message send',
	});
});

testRoutes.post(
	'/upload/local',
	uploadLocal.getConfig.single('avatar'),
	(request: Request, response: Response, next: NextFunction) => {
		try {
			if (!request.file) {
				return response.status(409).json({
					error: 'Você precisa informar uma imagem',
				});
			}

			return response.status(200).json({
				message: 'Tudo ok',
				data: request.file,
			});
		} catch (err) {
			next(err);
		}
	},
);

testRoutes.post(
	'/upload/s3',
	uploadCloud.getConfig.single('avatar'),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const {file} = request as {
				file: Express.Multer.File;
			};

			const {email} = request.body as {
				email: string;
			};

			if (!file) {
				return response.status(409).json({
					error: 'Você precisa informar uma imagem',
				});
			}

			return response.status(200).json({
				message: email,
				data: request.file,
			});
		} catch (err) {
			next(err);
		}
	});

testRoutes.post(
	'/upload/minio',
	uploadMinio.getConfig.single('avatar'),
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const {file} = request as {
				file: Express.Multer.File;
			};
			const {email} = request.body as {
				email: string;
			};

			if (!file) {
				return response.status(409).json({
					error: 'Você precisa informar uma imagem',
				});
			}

			return response.status(200).json({
				message: email,
				data: request.file,
			});
		} catch (err) {
			next(err);
		}
	});

export {testRoutes};
