import AgenteRouter from "./Agente";
import CidadaoRouter from "./Cidadao";
import NotificacaoRouter from "./Notificacao";

import { Express } from "express";
import { IEntityRouter, IMainRouter } from "./interfaces";

export class MainRouter implements IMainRouter {
  routers: IEntityRouter[];

  constructor(express: Express) {
    this.routers = [];
    this.routers.push(new AgenteRouter());
    this.routers.push(new CidadaoRouter());
    this.routers.push(new NotificacaoRouter());
    this.routers.forEach((router) => {
      express.use(router.uri, router.router);
    });
  }
}
