import { Express } from "express";
import { IMainRouter } from "../routes/interfaces";
import { RabbitMQConfig } from "../config/rabbitMQ/connection";

declare global {
  namespace Express {
    export interface Request {
      agenteId: string;
    }
  }
}

// App architecture types
export interface IApp {
  express: Express;
  router: IMainRouter;
  rabbitMQConfig: RabbitMQConfig;
  middlewares(): void;
  mongoConnect(): void;
}
