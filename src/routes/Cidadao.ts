import { Router } from "express";
import { CidadaoController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, ICidadaoController } from "../controllers/interfaces";

export default class CidadaoRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & ICidadaoController;

  constructor() {
    this.uri = "/cidadao";
    this.router = Router();
    this.controller = new CidadaoController();
    this.routes();
  }

  routes() {
    this.router.post("/signup", this.controller.signup);
    this.router.post("/login", this.controller.login);
  }
}
