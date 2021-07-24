import { Connection } from "amqplib";
import { ISubscribe } from "./interfaces";
import { RabbitMQConfig } from "../../config/rabbitMQ/connection";

export class Subscribe implements ISubscribe {
  connection: Connection | null;
  constructor() {
    this.connection = new RabbitMQConfig().connection;
  }

  async createSubscribeChannel(): Promise<any> {
    try {
      const channel = await this.connection?.createChannel();
      const example = "hello";
      await channel?.assertExchange(example, "fanout", { durable: false });
      const q = await channel?.assertQueue("", { exclusive: true });
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        q?.queue
      );
      await channel?.bindQueue(<string>q?.queue, example, "");
      channel?.consume(
        <string>q?.queue,
        (msg) => {
          console.log(" [x] %s", msg?.content.toString());
        },
        { noAck: true }
      );
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  closeConnection(): void {
    setTimeout(() => {
      this.connection?.close();
      console.log("Conexão encerrada.");
    });
  }
}
