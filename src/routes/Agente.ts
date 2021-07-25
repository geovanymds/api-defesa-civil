import { Router } from "express";
import { AgenteController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, IAgenteController } from "../controllers/interfaces";

export default class AgenteRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & IAgenteController;

  constructor() {
    this.uri = "/agente";
    this.router = Router();
    this.controller = new AgenteController();
    this.routes();
  }

  routes() {
    this.router.post("/signup", this.controller.signup);
    this.router.post("/login", this.controller.login);
  }
}
