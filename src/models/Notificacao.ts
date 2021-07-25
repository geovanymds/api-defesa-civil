import * as mongoose from "mongoose";
import { bairros } from "../utils";
import {
  INotificacao,
  gravidades,
  categorias,
  tiposStatus,
} from "./interfaces";

export class Notificacao implements INotificacao {
  bairro: string;
  titulo: string;
  descricao: string;
  gravidade: gravidades;
  categoria: categorias;
  status: tiposStatus;
  data: Date;

  constructor({
    bairro,
    titulo,
    descricao,
    gravidade,
    categoria,
    status,
    data,
  }: INotificacao) {
    this.bairro = bairro;
    this.titulo = titulo;
    this.descricao = descricao;
    this.gravidade = gravidade;
    this.categoria = categoria;
    this.status = status;
    this.data = data;
  }
}

const NotificacaoSchema: mongoose.Schema = new mongoose.Schema({
  bairro: {
    type: String,
    enum: bairros,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  gravidade: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
});

export interface NotificacaoDocument extends Notificacao, mongoose.Document {}
export const NotificacaoModel = mongoose.model<NotificacaoDocument>(
  "Notificacao",
  NotificacaoSchema
);
