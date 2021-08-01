export enum empregos {
  prefeitura = "prefeitura",
  policial = "policial",
  bombeiro = "bombeiro",
  cemig = "cemig",
  copasa = "copasa",
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
  admin: boolean;
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
  agente: string;
}
