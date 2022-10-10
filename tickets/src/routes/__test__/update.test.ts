import { Types } from "mongoose";
import request from "supertest";
import app from "../../app";

it("returns a 404 if the provided id does not exist", async () => {
  await request(app)
    .put(`/api/tickets/${new Types.ObjectId().toHexString()}`)
    .set("Cookie", global.signIn())
    .send({
      title: "test",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app)
    .put(`/api/tickets/${new Types.ObjectId().toHexString()}`)
    .send({
      title: "test",
      price: 20,
    })
    .expect(401);
});

it("return a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "Test",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signIn())
    .send({
      title: "new random string",
      price: 10,
    })
    .expect(401);
});

it("return a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signIn();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Test",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 200,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "ttitle",
      price: -10,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signIn();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "Test",
      price: 20,
    });

  const newPrice = 44;
  const newTitle = 'new-title';

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: newTitle,
      price: newPrice,
    })
    .expect(200);

 const ticketResponse =  await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toBe(newTitle);
  expect(ticketResponse.body.price).toBe(newPrice);
});
