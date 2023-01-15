import { Request, Response, Router } from 'express';
import { userRoutes } from './user.routes'
import { authRoutes } from './auth.routes'
import MailSend from '@providers/MailSend';
import multer from 'multer';
import { uploadLocal } from 'src/storage/local';
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

route.post("/test-upload-avatar", multer(uploadLocal.getConfig).single("avatar"), (request:Request,response:Response) => {
  if(request.file){
    return response.status(200).json({
      data: request.file
    })
  }

  return response.status(400).json({
    message: "Error"
  })
})

route
    .use("/user", userRoutes)
    .use("/session", authRoutes);

export { route };
