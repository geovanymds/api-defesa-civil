import * as mongoose from "mongoose";
import { bairros } from "../utils";
import { ICidadao } from "./interfaces";

export class Cidadao implements ICidadao {
  nome: string;
  sobrenome: string;
  cpf: string;
  senha: string;
  bairro: string;
  cep: string;
  dataDeNascimento: Date;

  constructor({
    nome,
    sobrenome,
    cpf,
    bairro,
    senha,
    cep,
    dataDeNascimento,
  }: ICidadao) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.cpf = cpf;
    this.bairro = bairro;
    this.senha = senha;
    this.cep = cep;
    this.dataDeNascimento = dataDeNascimento;
  }
}

const CidadaoSchema: mongoose.Schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  bairro: {
    type: String,
    enum: bairros,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  dataDeNascimento: {
    type: Date,
    required: true,
  },
});

export interface CidadaoDocument extends Cidadao, mongoose.Document {}
export const CidadaoModel = mongoose.model<CidadaoDocument>(
  "Cidadao",
  CidadaoSchema
);
