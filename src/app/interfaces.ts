import { Express } from "express";
import { RabbitMQConfig } from "../config/rabbitMQ/connection";

// App architecture types
export interface IApp {
  express: Express;
  rabbitMQConfig: RabbitMQConfig;
  middlewares(): void;
  mongoConnect(): void;
}
