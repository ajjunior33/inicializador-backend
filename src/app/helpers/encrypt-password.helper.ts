import { genSalt, hash } from 'bcryptjs'

const encryptPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10)
  const hashPassword = await hash(password, salt)
  return hashPassword
}

export default encryptPassword
