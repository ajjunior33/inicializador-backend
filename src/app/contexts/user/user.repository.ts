import { connection } from 'src/core/connect'
import { INewUser, IUser } from './interface/user.interface'

class UserReposistory {
  public async findUserByEmail(email: string) {
    const user = await connection.user.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  public async newUser({ name, email, password }: INewUser): Promise<IUser> {
    const user = await connection.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    return user
  }
}

export const userRepository = new UserReposistory()
