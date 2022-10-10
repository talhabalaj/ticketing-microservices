import { Types } from "mongoose";
import request from "supertest";
import app from "../../app";

it("returns a 404 if ticket is not found", async () => {
  await request(app)
    .get(`/api/tickets/${new Types.ObjectId().toHexString()}`)
    .send()
    .expect(404);
});

it("returns the ticket if found", async () => {
  const title = "test";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title,
      price,
    });

  const { id } = response.body;

  const ticketResponse = await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", global.signIn())
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
