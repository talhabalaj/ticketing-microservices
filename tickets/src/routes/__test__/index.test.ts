import request from "supertest";
import app from "../../app";

const createTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", global.signIn()).send({
    title: "test",
    price: 20,
  });
};

it("can fetch a list of tickets", async () => {
  await Promise.all([createTicket(), createTicket(), createTicket()]);

  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(3);
});
