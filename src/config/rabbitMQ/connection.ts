import amqp, { Connection } from "amqplib";
import { IRabbitMQConfig } from "./interfaces";

export class RabbitMQConfig implements IRabbitMQConfig {
  connection: Connection | null;
  constructor() {
    this.connection = null;
  }

  init(callback: Function): void {
    callback.bind(this)();
  }

  async callbackInit(): Promise<void> {
    await this.connect();
  }

  async connect(): Promise<any> {
    try {
      if (!process.env.RMQ_URL) {
        throw new Error("Falha ao se conectar ao RabbitMQ.");
      }
      console.log("Conectado ao HabbitMQ");
      const connection = await amqp.connect(process.env.RMQ_URL);
      this.connection = connection;
      return connection;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  closeConnection(): void {
    setTimeout(() => {
      this.connection?.close();
      console.log("Conexão encerrada.");
    }, 500);
  }
}
