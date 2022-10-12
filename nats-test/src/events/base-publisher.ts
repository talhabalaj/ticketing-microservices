import { Stan } from "node-nats-streaming";
import { Subjects } from "./subject";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  constructor(private client: Stan) {}

  async publish(data: T["data"]) {
    return new Promise<void>((res, rej) => {
      this.client.publish(this.subject, JSON.stringify(data), (err, _guid) => {
        if (err) rej(err);

        console.log(`> Event published`)

        res();
      });
    });
  }
}
