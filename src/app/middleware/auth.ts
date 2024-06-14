import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../../modules/auth/auth.interface";

const auth = (...role:TUserRole[]) => {
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
          throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token!");
        }
        //decoded
        if(role && !role.includes((decoded as JwtPayload).role)){
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "You have no access to this route"
              );
        } 
        req.user = decoded as JwtPayload;
        
        
        next();
      }
    );
  });
};

export default auth;
