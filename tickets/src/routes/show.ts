import {
  NotFoundError,
} from "@tj-tickets/common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticket = await Ticket.findById(id);

  if (!ticket) throw new NotFoundError();

  res.status(200).json(ticket);
});

export { router as showTicketRouter };
