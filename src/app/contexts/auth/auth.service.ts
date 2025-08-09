import generateJwtToken from 'src/app/helpers/generate-jwt-token.helper'
import matchPassword from 'src/app/helpers/match-password.helper'
import { Exception } from 'src/app/middleware/exception.middleware'
import { userRepository } from '../user/user.repository'
import { IAuthenticatedUser } from './interface/auth.interface'

class AuthService {
  public async createSession({ email, password }): Promise<IAuthenticatedUser> {
    const user = await userRepository.findUserByEmail(email)
    if (!user) throw new Exception('Invalid email or password', 401)

    const passwordIsValid = await matchPassword(password, (await user).password)
    if (!passwordIsValid) throw new Exception('Invalid email or password', 401)

    const accessToken = generateJwtToken(user)

    return {
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
      },
      access_token: accessToken,
    }
  }
}

export const authService = new AuthService()
