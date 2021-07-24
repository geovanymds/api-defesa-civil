import { Connection } from "amqplib";

export interface IPublisher {
  connection: Connection | null;
}

export interface ISubscribe {
  connection: Connection | null;
}
