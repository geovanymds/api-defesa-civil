export enum empregos {
  prefeitura = "Funcionario da Prefeitura",
  policial = "Policial Civil",
  bombeiro = "Bombeiro",
  cemig = "Funcionario da CEMIG",
  copasa = "Funcionario da COPASA",
}

export enum gravidades {
  alta = "alta",
  media = "media",
  baixa = "baixa",
}

export enum categorias {
  acidente = "acidente",
  desastre = "desastre",
  aviso = "aviso",
  informativo = "informativo",
}

export enum tiposStatus {
  encerrado = "encerrado",
  aberto = "aberto",
}

export interface IAgente {
  nome: string;
  sobrenome: string;
  cpf: string;
  emprego: empregos;
  senha: string;
  email: string;
  dataDeNascimento: Date;
}

export interface ICidadao {
  nome: string;
  sobrenome: string;
  cpf: string;
  senha: string;
  bairro: string;
  cep: string;
  dataDeNascimento: Date;
}

export interface ICidadao {
  nome: string;
  sobrenome: string;
  cpf: string;
  senha: string;
  bairro: string;
  cep: string;
  dataDeNascimento: Date;
}

export interface INotificacao {
  bairro: string;
  titulo: string;
  descricao: string;
  gravidade: gravidades;
  categoria: categorias;
  status: tiposStatus;
  data: Date;
}
