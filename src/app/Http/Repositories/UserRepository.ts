import { User } from "@prisma/client";
import { CreateUserProps } from "@dtos/User/CreateUserProps";

import { prisma } from "@database/prisma";

class UserRepository {
    public async createUser({
        name,
        email,
        password
    }: CreateUserProps) {
        return await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
    }

    public async checkIfUserEmailIsInUse(email: string): Promise<boolean> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        return user ? true : false
    }
    public async findUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                email
            }
        });
    }
}
export default UserRepository