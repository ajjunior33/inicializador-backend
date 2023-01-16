import 'dotenv/config';
import morgan from 'morgan';
import express, {type Request, type Response, type NextFunction} from 'express';
import cors from 'cors';
import {route} from '../routes/router';
import {Exception} from '../app/Exceptions/Exception';

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(route);

app.use('*', (req: Request, res: Response) => {
	// eslint-disable-next-line @typescript-eslint/no-throw-literal
	throw new Exception('A rota da requisição não encontrada', 404);
});

app.use((
	error: Error,
	request: Request,
	response: Response,
	next: NextFunction) => {
	if (error instanceof Exception) {
		return response.status(error.statusCode).json({
			status: 'error',
			statusCode: error.statusCode,
			message: error.message,
		});
	}

	return response.status(500).json({
		status: 'error',
		message: ' Internal server error',
	});
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
	console.log(`Server starting on port ${port} 🚀`);
});
