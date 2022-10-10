import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@tj-tickets/common";
import { Ticket } from "../models/Ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be great than zero"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price } = req.body;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }

    // Check if user owns the ticket.
    if (ticket.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    ticket.title = title;
    ticket.price = price;

    await ticket.save();

    res.json(ticket);
  }
);

export { router as updateTicketRouter };
