import { Request, Response, Router } from 'express';
import { userRoutes } from './user.routes'
import { authRoutes } from './auth.routes'
import MailSend from '@providers/MailSend';
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

route.post("/test-mailer", async (request:Request,response:Response) => {
  const { email } = request.body;
  await MailSend.sendMailer({
    context:{},
    email,
    subject:"Teste de envio de email",
    template:"Welcome"
  })

  return response.status(200).json({
    message: "Message send"
  })
})

route
    .use("/user", userRoutes)
    .use("/session", authRoutes);

export { route };
