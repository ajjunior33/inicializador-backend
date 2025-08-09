import { compare } from 'bcryptjs'

async function matchPassword(
  password: string,
  hashed: string,
): Promise<boolean> {
  const validatePassword = await compare(password, hashed)
  return validatePassword
}

export default matchPassword
