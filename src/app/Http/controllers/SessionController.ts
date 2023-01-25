
import { NextFunction, Request, Response } from "express";
import dayjs from 'dayjs';
import { HashProvider } from "@providers/HashProvider";
import { SessionRepository } from "@repositories/SessionRepository";
import UserRepository from "@repositories/UserRepository";
import { Exception } from "@exceptions/Exception";
import { GenerateToken } from '@providers/GenerateToken'
import { GenerateRefreshToken } from '@providers/GenerateRefreshToken'



class AuthController {
    public async createSession(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;
            const userRepository = new UserRepository();
            const hashProvider = new HashProvider();
            const sessionRepository = new SessionRepository();

            const user = await userRepository.findUserByEmail(email);
            if (!user) {
                throw new Exception("Email ou senha inválidos", 401);
            }

            const matchPassword = await hashProvider.compareHash(password, user.password);

            if (!matchPassword) {
                throw new Exception("Email ou senha inválidos", 401);
            }


            const session = await sessionRepository.createSession({ user });
            return response.status(200).json(session)
        } catch (err) {
            next(err);
        }
    }
    public async refreshTokenSession(request: Request, response:Response, next: NextFunction){
      try{
        const {refresh_token} = request.body;
        
        const sessionRepository = new SessionRepository();
        const find = await sessionRepository.findRefreshToken(refresh_token);

        if(!find) throw new Exception("Refresh token invalido." ,401);
        
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(find.expiresIn));

        const generateToken = new GenerateToken();
        const token = await generateToken.execute(find.userId);
        
        
        if(refreshTokenExpired){
          await sessionRepository.deleteAllRefreshTokenByUserId(find.userId);
          const generateRefreshToken = new GenerateRefreshToken();
          const newRefreshToken = await generateRefreshToken.execute(find.userId);
          
          return response.status(200).json ({
             token,
             newRefreshToken 
          })
        }

        
        return response.status(200).json({
          token
        });
      }catch(err){
        next(err);
      }
    }
}

export default new AuthController();