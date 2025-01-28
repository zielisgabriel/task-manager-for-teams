import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { hash } from 'bcrypt'
import { AppError } from '../utils/AppError'

export class UsersController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().max(100, "máximo 100 caracteres").trim(),
            email: z.string().max(150, "máximo 150 caracteres").trim(),
            password: z.string().min(6, "mínimo 6 caracteres").max(255),
        })

        const { name, email, password } = bodySchema.parse(req.body)

        if(await prisma.users.findFirst({
            where: { email }
        })){
            throw new AppError('Email já cadastrado', 401)
        }

        const hashPassword = await hash(password, 10)

        await prisma.users.create({
            data: {
                name,
                email,
                password: hashPassword,
            }
        })

        res.status(201).json()
    }
}