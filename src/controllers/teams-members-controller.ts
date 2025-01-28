import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'

export class TeamsMembersController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            userId: z.string().uuid(),
            teamId: z.string().uuid(),
        })

        const { userId, teamId } = bodySchema.parse(req.body)

        if(await prisma.teamMembers.findFirst({
            where: { userId }
        })){
            throw new AppError('Usuário já existente no time', 401)
        }

        res.status(201).json()
    }
}