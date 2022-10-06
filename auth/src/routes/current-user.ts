import { Router } from "express";
import { currentUser } from "@tj-tickets/common";

export const currentUserRouter = Router();

currentUserRouter.get("/api/users/currentuser", currentUser, (req, res) => {
  res.json({
    currentUser: req.currentUser,
  });
});
