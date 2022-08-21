import { Router } from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

export const currentUserRouter = Router();

currentUserRouter.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  (req, res) => {
    res.json({
      currentUser: req.currentUser,
    });
  }
);
