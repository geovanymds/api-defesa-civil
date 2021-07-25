import { Agente, AgenteModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, IAgenteController } from "./interfaces";
import HttpException from "../helpers/httpException";
import secret from "../config/jwt";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export default class AgenteController
  implements IController, IAgenteController
{
  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    const {
      nome,
      sobrenome,
      cpf,
      emprego,
      email,
      senha,
      checkSenha,
      dataDeNascimento,
    } = req.body;

    try {
      if (senha !== checkSenha) {
        throw new HttpException(403, "The passwords don't match.");
      }

      const hashedPass = await bcrypt.hash(senha, 12);

      const newAgente = new Agente({
        nome,
        sobrenome,
        cpf,
        emprego,
        email,
        senha: hashedPass,
        dataDeNascimento,
      });

      console.log(newAgente);

      const agente = await AgenteModel.create(newAgente);

      const token = jwt.sign(
        {
          id: agente._id,
          cpf: agente.cpf,
          email: agente.email,
        },
        secret
      );

      return res.status(200).json({
        message: "Agente cadastrado.",
        agenteId: agente.id,
        token,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { cpf, senha } = req.body;

    try {
      if (!cpf) {
        throw new HttpException(401, "Por favor, informe o cpf.");
      }

      const agente = await AgenteModel.findOne({ cpf });

      if (!agente) {
        throw new HttpException(404, "Agente não registrado.");
      }

      const unhashedPass = await bcrypt.compare(senha, agente.senha);

      if (!unhashedPass) {
        throw new HttpException(401, "Credenciais inválidas.");
      }

      const token = jwt.sign(
        {
          id: agente.id,
          cpf: agente.cpf,
          email: agente.email,
        },
        secret
      );

      return res.status(200).json({
        message: "Agente conectado.",
        agenteId: agente.id,
        token,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}
