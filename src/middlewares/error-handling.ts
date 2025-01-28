import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export function errorHandling(error: any, req: Request, res: Response, _: NextFunction){
    if(error instanceof ZodError){
        return res.status(500).json(JSON.parse(error.message))
    }

    if(error instanceof AppError){
        return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: error.message })
}