import nats, { Message, Stan } from "node-nats-streaming";
import crypto from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();


function getRandomClientId() {
  return crypto.randomUUID();
}

const stan = nats.connect("ticketing", getRandomClientId(), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("Connection Closed.");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

