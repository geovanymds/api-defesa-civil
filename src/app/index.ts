import dotenv from "dotenv";
dotenv.config();
import { IApp } from "./interfaces";
import express, { Express, Request, Response } from "express";
import Connection from "../config/database/connection";
import errorHandler from "../middlewares/errorHandler";
import cors from "../middlewares/cors";

export default class App implements IApp {
  express: Express;

  constructor() {
    this.express = express();
    this.mongoConnect();
    this.middlewares();
    this.routeNotFound();
    this.handleError();
    this.express.listen(process.env.APP_PORT);
    console.log(`Listening on port ${process.env.APP_PORT}`);
  }

  mongoConnect() {
    const connection = new Connection();
    connection.init(connection.dbConnect);
  }

  middlewares() {
    this.express.use(cors);
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.get("/", (req, res, next) => {
      return res.status(200).json({ message: "Projeto iniciado." });
    });
  }

  routeNotFound() {
    this.express.use((req: Request, res: Response) => {
      res.status(404).json({ message: "Resource not found." });
    });
  }

  handleError() {
    this.express.use(errorHandler);
  }
}