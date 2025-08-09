import { genSaltSync, hashSync } from 'bcryptjs'

function encryptPassword(password: string): string {
  const salt = genSaltSync(10)
  const hashPassword = hashSync(password, salt)
  return hashPassword
}

export default encryptPassword
