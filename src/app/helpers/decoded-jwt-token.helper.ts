import jwt, { DecodeOptions } from 'jsonwebtoken'
import config from 'src/core/config'
import { Exception } from '../middleware/exception.middleware'
function decodedJwtToken(token: string) {
  try {
    const decoded = jwt.decode(
      token,
      config.jwt.APPLICATION_TOKEN as DecodeOptions,
    )
    return decoded
  } catch (err) {
    throw new Exception('Não foi possível decodificar o token.', 401)
  }
}

export default decodedJwtToken
