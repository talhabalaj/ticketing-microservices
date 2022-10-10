import nats, { Message } from "node-nats-streaming";
import crypto from "crypto";

console.clear();

function getRandomClientId() {
  return crypto.randomUUID();
}

const stan = nats.connect("ticketing", getRandomClientId(), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const subscription = stan.subscribe("ticket:created", "group");

  subscription.on("message", (msg: Message) => {
    console.log(msg.getData());
  });
});

console.log("hello :)");
