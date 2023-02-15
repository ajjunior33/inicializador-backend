import { Router } from 'express';
import sessionController from '@controllers/SessionController';
import { MiddlewareCreateSession } from '@middlewares/routes/Session/CreateSession';
import { MiddlewareRefreshToken } from '@middlewares/routes/Session/RefreshToken';

const authRoutes = Router();

authRoutes
  .post('/', MiddlewareCreateSession, sessionController.createSession)
  .post("/refresh_token", MiddlewareRefreshToken, sessionController.refreshTokenSession);

export { authRoutes };
