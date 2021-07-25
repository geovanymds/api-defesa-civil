import HttpException from "../helpers/httpException";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = <string>req.headers.authorization;
  console.log(req.headers);

  try {
    if (!authHeader) {
      throw new HttpException(401, "Token não fornecido.");
    }

    const [, token] = authHeader.split(" ");

    const decoded = <any>jwt.verify(token, jwtSecret);

    if (!decoded) {
      throw new HttpException(403, "Não autorizado.");
    }

    req.agenteId = decoded.id;

    return next();
  } catch (error) {
    next(new HttpException(error.status || 500, error.message));
  }
};
