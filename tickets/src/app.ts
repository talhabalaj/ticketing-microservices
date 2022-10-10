import "express-async-errors";
import express, { json } from "express";
import session from "cookie-session";
import { currentUser, NotFoundError } from "@tj-tickets/common";
import { errorHandler } from "@tj-tickets/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);
app.use(json());
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
