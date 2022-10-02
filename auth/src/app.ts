import 'express-async-errors'
import express, { json } from 'express'
import session from 'cookie-session'

import { errorHandler } from "./middlewares/error-handler";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";

import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secure: process.env.NODE_ENV !== "test", 
    signed: false,
  })
);
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);


export default app;
