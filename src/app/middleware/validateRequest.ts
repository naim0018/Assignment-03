import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodTypeAny } from "zod";

export const validationRequest = (schema: ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
     try {
        
      await schema.parseAsync(
          req.body
      )
      next()
     } catch (error) {
         next(error)
     }
    };
  };