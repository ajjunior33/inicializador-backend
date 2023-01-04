import { Router } from 'express';
import sessionController from '@controllers/SessionController';
import { MiddlewareCreateSession } from '@middlewares/routes/Session/CreateSession';

const authRoutes = Router();

authRoutes
  .post('/', MiddlewareCreateSession, sessionController.createSession)

export { authRoutes };
