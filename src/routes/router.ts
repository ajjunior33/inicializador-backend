import { Request, Response, Router } from 'express';
import { userRoutes } from './user.routes'
import { authRoutes } from './auth.routes'
import { testRoutes } from './testes.routes';
const route = Router();

route.get('/', (
  request: Request,
  response: Response
) => {
  return response.json({
    messager: 'Hello,world.',
    authors: [
      {
        name: "André Souza",
        email: "andresouza@meraki.dev.br"
      }
    ],
    version: '1.1.0',
  });
});


route
  .use("/user", userRoutes)
  .use("/test", testRoutes)
  .use("/session", authRoutes);

export { route };
