import request from "supertest";
import app from "../../app";

it("returns a 404 if ticket is not found", async () => {
  await request(app).get("/api/tickets/ajasdlfj").send().expect(404);
});

it("returns the ticket if found", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signIn())
    .send({
      title: "test",
      price: 20,
    });

  await request(app)
    .post("/api/tickets/")
    .set("Cookie", global.signIn())
    .send({
      title: "test",
      price: 20,
    })
    .expect(201);
});
