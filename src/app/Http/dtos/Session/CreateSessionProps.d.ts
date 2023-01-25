import { User } from "@prisma/client";

export interface RequestCreateSessionProps {
    user: User;
}
export interface RequestLoginProps {
    email: string;
    password: string;
}


export interface ResponseCreateSessionProps {
    user: {
        id:string;
        name:string;
        email:string;
        forgoutPasswordToken:string;
        forgoutPasswordDate: Date;
    };
  refreshToken: RefreshTokenProps;
    token: string;
}


interface RefreshTokenProps{
  id: string;
  expiresIn: number;
  userId: string;
}