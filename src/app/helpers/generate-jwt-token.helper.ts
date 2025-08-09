import jwt from 'jsonwebtoken'
import config from 'src/core/config'
import { IUser } from '../contexts/user/interface/user.interface'

function generateJwtToken(user: IUser) {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
  }

  const options = {
    expiresIn: config.jwt.APPLICATION_EXPIRE_IN_TOKEN,
  } as jwt.SignOptions

  const token = jwt.sign(payload, config.jwt.APPLICATION_TOKEN, options)

  return token
}

export default generateJwtToken
