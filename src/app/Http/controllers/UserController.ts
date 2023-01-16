import {type Request, type Response, type NextFunction} from 'express'
import UserRepository from '@repositories/UserRepository';
import {HashProvider} from '@providers/HashProvider';
import {Exception} from '@exceptions/Exception';
import MailSend from '@providers/MailSend';

class UserController {
	public async store(request: Request, response: Response, next: NextFunction) {
		try {
			const userRepository = new UserRepository();
			const {name, email, password} = request.body as {
				name: string;
				email: string;
				password: string;
			};
			const checkIfUserEmailIsInUse = await userRepository.findUserByEmail(email);
			if (checkIfUserEmailIsInUse) {
				// eslint-disable-next-line @typescript-eslint/no-throw-literal
				throw new Exception('O email informado já está cadastrado.', 400);
			}

			const hashProvider = new HashProvider();
			const passwordHashed = await hashProvider.generateHash(password);
			const createUser = await userRepository.createUser({
				name,
				email,
				password: passwordHashed,
			});
			createUser.password = '';

			await MailSend.sendMailer({
				context: undefined,
				email,
				subject:'Welcome',
				template:'Welcome',
			});

			return response.status(200).json({
				message: 'Usuário criado com sucesso',
				status: true,
				createUser,
			});
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
