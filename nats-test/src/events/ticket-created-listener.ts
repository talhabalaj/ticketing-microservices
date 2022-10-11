import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subject";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queryGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {

    msg.ack();
  } 
}
