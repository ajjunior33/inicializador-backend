import { sign } from 'jsonwebtoken'
import ConfigAuthenticate from "@providers/ConfigAuthenticate";
class GenerateToken {
  async execute(user_id: string){
    const { expiresIn, secret } = ConfigAuthenticate.jwt
    return sign({}, secret, {
      subject: user_id,
      expiresIn
    });
  }
}

export {GenerateToken};