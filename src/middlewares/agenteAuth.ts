import { AgenteModel } from "../models";
import HttpException from "../helpers/httpException";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agente = await AgenteModel.findById(req.agenteId);
    if (!agente) {
      throw new HttpException(403, "Não autorizado.");
    }
    return next();
  } catch (error) {
    next(new HttpException(error.status || 500, error.message));
  }
};
