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

export interface INotificacaoController {
  cadastrar(req: Request, res: Response, next: NextFunction): Promise<any>;
  listarPorBairro(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
  listarPorAgente(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
  encerrar(req: Request, res: Response, next: NextFunction): Promise<any>;
}
