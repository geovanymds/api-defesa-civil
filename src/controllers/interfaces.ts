import { Request, Response, NextFunction } from "express";

export interface IController {}

export interface IAgenteController {
  signup(req: Request, res: Response, next: NextFunction): Promise<any>;
  login(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface ICidadaoController {
  signup(req: Request, res: Response, next: NextFunction): Promise<any>;
  login(req: Request, res: Response, next: NextFunction): Promise<any>;
}
