import { Router } from "express";
import { NotificacaoController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, INotificacaoController } from "../controllers/interfaces";
import auth from "../middlewares/auth";
import agenteAuth from "../middlewares/agenteAuth";

export default class NotificacaoRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & INotificacaoController;

  constructor() {
    this.uri = "/notificacao";
    this.router = Router();
    this.controller = new NotificacaoController();
    this.routes();
  }

  routes() {
    this.router.post("/cadastrar", auth, agenteAuth, this.controller.cadastrar);
    this.router.get(
      "/listarPorBairro/:bairro",
      auth,
      this.controller.listarPorBairro
    );
    this.router.get(
      "/listarPorAgente/:agenteId",
      auth,
      this.controller.listarPorAgente
    );
    this.router.put(
      "/encerrar/:id",
      auth,
      agenteAuth,
      this.controller.encerrar
    );
  }
}
