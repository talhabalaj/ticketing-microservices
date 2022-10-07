import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signIn: () => string[];
}

global.signIn = () => {
  // Build a JWT Payload { id, email }
  const payload = {
    id: "tseasfdasfasdfasdf",
    email: "test@test.com",
  };

  // Create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // create session
  const session = {
    jwt: token,
  };

  // convert to base64
  const base64 = Buffer.from(JSON.stringify(session)).toString("base64");

  return [`session=${base64}`];
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
