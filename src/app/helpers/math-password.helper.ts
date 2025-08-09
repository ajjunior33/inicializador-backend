import { compare } from 'bcryptjs'
import { Exception } from '../middleware/exception.middleware'

async function mathPassword(
  password: string,
  hashed: string,
): Promise<boolean> {
  try {
    const validatePassword = await compare(password, hashed)
    return validatePassword
  } catch (err) {
    throw new Exception('Usuário ou senha inválidos.', 401)
  }
}

export default mathPassword
