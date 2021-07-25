import { Cidadao, CidadaoModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, ICidadaoController } from "./interfaces";
import HttpException from "../helpers/httpException";
import secret from "../config/jwt";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export default class CidadaoController
  implements IController, ICidadaoController
{
  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    const {
      nome,
      sobrenome,
      cpf,
      bairro,
      senha,
      checkSenha,
      cep,
      dataDeNascimento,
    } = req.body;

    try {
      if (senha !== checkSenha) {
        throw new HttpException(403, "The passwords don't match.");
      }

      const hashedPass = await bcrypt.hash(senha, 12);

      const newCidadao = new Cidadao({
        nome,
        sobrenome,
        cpf,
        bairro,
        cep,
        senha: hashedPass,
        dataDeNascimento,
      });

      console.log(newCidadao);

      const cidadao = await CidadaoModel.create(newCidadao);

      const token = jwt.sign(
        {
          id: cidadao._id,
          cpf: cidadao.cpf,
        },
        secret
      );

      return res.status(200).json({
        message: "Cidadao cadastrado.",
        bairro: cidadao.bairro,
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

      const cidadao = await CidadaoModel.findOne({ cpf });

      if (!cidadao) {
        throw new HttpException(404, "Cidadao não registrado.");
      }

      const unhashedPass = await bcrypt.compare(senha, cidadao.senha);

      if (!unhashedPass) {
        throw new HttpException(401, "Credenciais inválidas.");
      }

      const token = jwt.sign(
        {
          id: cidadao.id,
          cpf: cidadao.cpf,
        },
        secret
      );

      return res.status(200).json({
        message: "Cidadão conectado.",
        bairro: cidadao.bairro,
        token,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}
