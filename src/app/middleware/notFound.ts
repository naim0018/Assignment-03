import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const notFound = (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    statusCode:404,
    message: "Not Found",
  });
};
