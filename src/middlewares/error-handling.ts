import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandling(error: any, req: Request, res: Response, _: NextFunction){
    if(error instanceof ZodError){
        return res.status(500).json(JSON.parse(error.message))
    }

    return res.status(500).json(error.message)
}