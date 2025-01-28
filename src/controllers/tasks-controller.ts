import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'

export class TasksController{
    async index(req: Request, res: Response){
        if(req.user.role === 'MEMBER'){
            const tasks = await prisma.tasks.findMany({
                where: { assignedTo: req.user.user_id },
                include: {
                    Teams: {
                        select: {
                            name: true,
                            description: true,
                        }
                    },

                    Users: {
                        select: {
                            name: true,
                            email: true,
                            role: true,
                        }
                    }
                }
            })

            res.json({ tasks })
            return
        }

        const tasks = await prisma.tasks.findMany({
            include: {
                Teams: {
                    select: {
                        name: true,
                        description: true,
                    }
                },

                Users: {
                    select: {
                        name: true,
                        email: true,
                        role: true,
                    }
                }
            }
        })

        res.json({ tasks })
    }

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