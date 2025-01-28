import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'

export class TasksController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            title: z.string().max(200, "Máximo de caracteres é 200"),
            description: z.string().default('No description'),
            priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
            assignedTo: z.string().uuid(),
            teamId: z.string().uuid()
        })

        const {
            title,
            description,
            priority,
            assignedTo,
            teamId,
        } = bodySchema.parse(req.body)

        await prisma.tasks.create({
            data: {
                title,
                description,
                priority,
                assignedTo,
                teamId,
            }
        })

        res.status(201).json()
    }
}