import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'
import { compare } from 'bcrypt'
import { sign, SignOptions } from 'jsonwebtoken'
import { authConfig } from '../config/auth.config'

export class SessionsController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            email: z.string().trim(),
            password: z.string().trim(),
        })

        const { email, password } = bodySchema.parse(req.body)

        const session = await prisma.users.findFirst({
            where: { email }
        })

        if(!session || !await compare(password, session.password)){
            throw new AppError('Email e/ou senha incorretos')
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({ role: String(session.role) }, secret, {
            expiresIn: expiresIn as SignOptions['expiresIn'],
            subject: session.id,
        })

        res.status(201).json({ token })
    }
}