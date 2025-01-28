import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { verify } from "jsonwebtoken";
import { authConfig } from "../config/auth.config";

type JwtPayload = {
    sub: string,
    role: string,
}

export function ensureAuthentication(req: Request, res: Response, next: NextFunction){
    const tokenAuth = req.headers.authorization

    if(!tokenAuth){
        throw new AppError('Token não informado ou indisponível!', 401)
    }

    const [, token] = tokenAuth.split(' ')

    const { sub: user_id, role } = verify(token, authConfig.jwt.secret) as JwtPayload

    req.user = {
        user_id,
        role,
    }

    return next()
}