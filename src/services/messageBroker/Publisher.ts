import { Connection } from "amqplib";
import { IPublisher } from "./interfaces";
import { RabbitMQConfig } from "../../config/rabbitMQ/connection";

export class Publisher implements IPublisher {
  connection: Connection | null;
  constructor(config: RabbitMQConfig) {
    this.connection = new RabbitMQConfig().connection;
  }

  async createPublisherChannel(): Promise<any> {
    try {
      const channel = await this.connection?.createChannel();
      const exchange = "logs";
      const msg = "Hello World";
      await channel?.assertExchange(exchange, "fanout", {
        durable: false,
      });
      await channel?.publish(exchange, "", Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
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
