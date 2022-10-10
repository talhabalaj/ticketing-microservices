import express, { Request, Response } from "express";
import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  res.send(await Ticket.find({}));
});

export { router as indexTicketRouter };
