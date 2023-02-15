import { sign } from "jsonwebtoken";
import ConfigAuthenticate from "@providers/ConfigAuthenticate";
import { RequestCreateSessionProps, ResponseCreateSessionProps } from "@dtos/Session/CreateSessionProps";
import { GenerateRefreshToken } from '@providers/GenerateRefreshToken'

import { PrismaClient } from '@prisma/client'
import { GenerateToken } from '@providers/GenerateToken'
const prisma = new PrismaClient();

class SessionRepository {
    public async createSession({
        user
    }: RequestCreateSessionProps): Promise<ResponseCreateSessionProps> {
        const { expiresIn, secret } = ConfigAuthenticate.jwt
        const id = String(user.id) as string;
        const generateToken = new GenerateToken();
        const token = await generateToken.execute(id);
        
        const generateReshToken = new GenerateRefreshToken();
        const refreshToken = await generateReshToken.execute(id);

        const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            forgoutPasswordToken: user.forgoutPasswordToken,
            forgoutPasswordDate: user.forgoutPasswordDate,
        }
        return { user: newUser, token, refreshToken};
    }
    
    async findRefreshToken(refresh_token: string){
      return await prisma.refreshToken.findFirst({
        where: {
          id: refresh_token
        }
      });
    }
    
    async deleteAllRefreshTokenByUserId(userId: string){
      return await prisma.refreshToken.deleteMany({
        where:{
          userId
        }
      })
    }
}

export { SessionRepository }