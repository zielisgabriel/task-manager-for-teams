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
    
    async updateStatus(req: Request, res: Response){
        if(req.user.role = 'ADMIN'){
            const idSchema = z.object({
                id: z.string().uuid()
            })
            
            const bodySchema = z.object({
                status: z.enum(['PENDING', 'IN_PROCESS', 'COMPLETED']).optional(),
                priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
            })

            const { id } = idSchema.parse(req.params)
            const { status, priority } = bodySchema.parse(req.body)

            await prisma.tasks.update({
                where: {
                    id,
                },
                data: {
                    status,
                    priority,
                }
            })
            
            res.json()
            return
        }

        const idSchema = z.object({
            id: z.string().uuid()
        })
        
        const bodySchema = z.object({
            status: z.enum(['PENDING', 'IN_PROCESS', 'COMPLETED'])
        })
        
        const { id } = idSchema.parse(req.params)
        
        const taskOfUser = await prisma.tasks.findFirst({
            where: {
                id,
                Users: {
                    id: req.user.user_id
                },
            }
        })

        if(taskOfUser?.status === 'COMPLETED'){
            throw new AppError('Tarefa completada. Não pode ser alterada!')
        }
        
        if(!taskOfUser){
            throw new AppError('Essa task não pertence ao seu usuário', 401)
        }
        
        const { status } = bodySchema.parse(req.body)

        if(status === 'PENDING'){
            throw new AppError('Não é possível alterar o status para pendente!')
        }
        
        await prisma.tasks.update({
            where: {
                id,
                Users: {
                    id: req.user.user_id
                }
            },
            data: {
                status
            }
        })
        
        res.json()
    }
}