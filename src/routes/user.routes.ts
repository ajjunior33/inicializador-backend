
import {Router} from 'express';
import {MiddlewareCreateUser} from '@middlewares/routes/User/CreateUser';
import userController from '@controllers/UserController';

// eslint-disable-next-line new-cap
const userRoutes = Router();

userRoutes.post('/', MiddlewareCreateUser, userController.store);

export {userRoutes};
