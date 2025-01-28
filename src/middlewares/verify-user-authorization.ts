import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function verifyUserAuthorization(role: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        if(!role.includes(req.user.role)){
            throw new AppError('Não autorizado', 401)
        }

        return next()
    }
}