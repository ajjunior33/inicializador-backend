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
    throw new Exception('There was an error trying to generate the token.', 400)
  }
}

export default decodedJwtToken
