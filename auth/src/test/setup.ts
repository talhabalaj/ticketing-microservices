import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";

declare global {
  var signIn: () => Promise<string[]>;
}

jest.setTimeout(60000);

global.signIn = async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "testtest",
    })
    .expect(201);

  return response.get("Set-Cookie");
};

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});
