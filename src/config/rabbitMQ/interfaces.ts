import { Connection } from "amqplib";

export interface IRabbitMQConfig {
  connection: Connection | null;
}
