export interface IUser {
  id: number
  name: string
  email: string
  password: string
  forgotPasswordToken?: string
  forgotPasswordDate?: Date
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface INewUser {
  name: string
  email: string
  password: string
}
