import hbs from "nodemailer-express-handlebars";
import nodemailer from 'nodemailer';
import path from 'path';

import { MailConfig } from "@configs/mail";

import { Exception } from "@exceptions/Exception";
import { SendMailerProps } from "@dtos/MailerProvider/SendMailerProps";

class ModuleMailer{
  constructor(
    public to?: string,
    public subject?:string,
    public template?: string,
    public context?: any
  ){}

  public async configMailer(){
    let mailOptions ={
      from: process.env.MAIL_FROM,
      to: this.to,
      subject: this.subject,
      template: this.template,
      context: this.context 
    }

    const transporter = nodemailer.createTransport({
      host: MailConfig.host,
      port: MailConfig.port,
      auth: {
        user:MailConfig.user,
        pass: MailConfig.pass
      }
    })

    transporter.use(
      "compile",
      hbs({
        viewEngine:{
          defaultLayout: undefined,
          partialsDir: path.resolve("./src/resources/mail"),
        },
        viewPath: path.resolve("./src/resources/mail"),
        extName:".html"
      })
    )

    return transporter.sendMail(mailOptions);
  }

  public async sendMailer({
    email,
    subject,
    template,
    context
  }:SendMailerProps){

    this.to = email;
    this.subject = subject;
    this.template = template;
    this.context = context;
  
    await this.configMailer()
      .then(response => {
        console.log(response.messageId)
        return true
      }).catch(err => {
        throw new Exception(err.message, 500);
      })
  }

}

export default new ModuleMailer();