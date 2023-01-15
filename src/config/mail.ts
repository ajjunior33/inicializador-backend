export const MailConfig = {
  host: process.env.MAIL_HOST ?? "smtp.mailtrap.io",
  port: parseInt(process.env.MAIL_PORT) ?? 2525,
  user: process.env.MAIL_USER ?? "",
  pass: process.env.MAIL_PASS ?? ""
}