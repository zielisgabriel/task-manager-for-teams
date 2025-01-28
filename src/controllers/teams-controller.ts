import { Request, Response } from 'express'
import z from 'zod'
import { prisma } from '../database/prisma'
import { AppError } from '../utils/AppError'

export class TeamsController{
    async index(req: Request, res: Response){
        const teams = await prisma.teams.findMany({
            include: {
                TeamMembers: {
                    select: {
                        Users: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                task: {
                                    select: {
                                        id: true,
                                        title: true,
                                        description: true,
                                        status: true,
                                        priority: true,
                                        createdAt: true,
                                        updatedAt: true,
                                    }
                                },
                            }
                        }
                    }
                }
            }
        })

        res.json(teams)
    }

    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(5).max(30),
            description: z.string().trim().optional().default('No description'),
        })

        const { name, description } = bodySchema.parse(req.body)

        if(await prisma.teams.findFirst({
            where: { name }
        })){
            throw new AppError('Nome existente', 401)
        }

        await prisma.teams.create({
            data: { name, description }
        })

        res.status(201).json()
    }

    async delete(req: Request, res: Response){
        const idSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idSchema.parse(req.params)

        await prisma.teams.delete({
            where: { id }
        })

        res.json()
    }
}