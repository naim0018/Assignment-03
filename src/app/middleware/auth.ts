import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../config";

 

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //Checking Token 
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "You are not authorized user!"
      );
    }
    // JWT Token Verification
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "Invalid token!"
              );
        }
        //decoded
        console.log(decoded)
        req.user = decoded
      }
    );

    next();
  });
};

export default auth