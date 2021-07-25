import * as mongoose from "mongoose";
import { IAgente, empregos } from "./interfaces";

export class Agente implements IAgente {
  nome: string;
  sobrenome: string;
  cpf: string;
  emprego: empregos;
  senha: string;
  email: string;
  dataDeNascimento: Date;

  constructor({
    nome,
    sobrenome,
    cpf,
    emprego,
    senha,
    email,
    dataDeNascimento,
  }: IAgente) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.cpf = cpf;
    this.emprego = emprego;
    this.senha = senha;
    this.email = email;
    this.dataDeNascimento = dataDeNascimento;
  }
}

const AgenteSchema: mongoose.Schema = new mongoose.Schema({
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
    required: true,
  },
  emprego: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dataDeNascimento: {
    type: Date,
    required: true,
  },
});

export interface AgenteDocument extends Agente, mongoose.Document {}
export const AgenteModel = mongoose.model<AgenteDocument>(
  "Agente",
  AgenteSchema
);
