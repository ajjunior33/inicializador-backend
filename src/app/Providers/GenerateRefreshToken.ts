import dayjs from 'dayjs';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class GenerateRefreshToken{
  async execute(userId: string){
    const expiresIn = dayjs().add(15, "second").unix();
    
    
    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    });
    
    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };