import encryptPassword from 'src/app/helpers/encrypt-password.helper'
import generateJwtToken from 'src/app/helpers/generate-jwt-token.helper'
import { Exception } from 'src/app/middleware/exception.middleware'
import { IAuthenticatedUser } from '../auth/interface/auth.interface'
import { INewUser } from './interface/user.interface'
import { userRepository } from './user.repository'

class UserService {
  public async createUser({
    name,
    email,
    password,
  }: INewUser): Promise<IAuthenticatedUser> {
    const user = await userRepository.findUserByEmail(email)

    if (user)
      throw new Exception(
        'There is already a user registered with that email',
        400,
      )

    const encryptPass = await encryptPassword(password)

    const data = {
      name,
      password: encryptPass,
      email,
    }

    const newUser = await userRepository.newUser(data)
    const generateAccessToken = generateJwtToken(newUser)

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      access_token: generateAccessToken,
    }
  }
}

export const userService = new UserService()
