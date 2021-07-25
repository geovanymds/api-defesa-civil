import { tiposStatus } from "../models/interfaces";
import { Notificacao, NotificacaoModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, INotificacaoController } from "./interfaces";
import HttpException from "../helpers/httpException";

export default class NotificacaoController
  implements IController, INotificacaoController
{
  async cadastrar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { bairro, titulo, descricao, gravidade, categoria } = req.body;
    const status = tiposStatus.aberto;
    const agente = req.agenteId;
    try {
      const newNotificacao = new Notificacao({
        bairro,
        titulo,
        descricao,
        gravidade,
        categoria,
        status,
        data: new Date(),
        agente,
      });

      console.log(newNotificacao);

      const notificacao = await NotificacaoModel.create(newNotificacao);

      return res.status(200).json({
        message: "Notificação cadastrada.",
        notificacao,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async listarPorBairro(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { bairro } = req.params;

    try {
      if (!bairro) {
        throw new HttpException(401, "Por favor, informe um bairro válido.");
      }

      const notificacoes = await NotificacaoModel.find({ bairro });

      if (!notificacoes) {
        throw new HttpException(404, "Nenhuma notificacao encontrada.");
      }

      return res.status(200).json({
        notificacoes,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async listarPorAgente(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { agenteId } = req.params;

    try {
      if (!agenteId) {
        throw new HttpException(404, "Nenhuma notificação encontrada.");
      }

      const notificacoes = await NotificacaoModel.find({ agente: agenteId });

      if (!notificacoes) {
        throw new HttpException(404, "Nenhuma notificacao encontrada.");
      }

      return res.status(200).json({
        notificacoes,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async encerrar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;

    try {
      if (!id) {
        throw new HttpException(404, "Nenhuma notificação encontrada.");
      }

      const notificacao = await NotificacaoModel.findById(id);

      if (!notificacao) {
        throw new HttpException(404, "Notificacao não encontrada.");
      }

      notificacao.status = tiposStatus.encerrado;
      const notificacaoResponse = await notificacao.save();

      return res.status(200).json({
        mensagem: "Notificação encerrada.",
        notificacao: notificacaoResponse,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}
