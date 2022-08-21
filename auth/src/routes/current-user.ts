import { Router } from "express";
import jwt from "jsonwebtoken";

export const currentUserRouter = Router();

currentUserRouter.get("/api/users/currentuser", (req, res) => {
  if (!req.session?.jwt) {
    return res.send({
      currentUser: null,
    });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    return res.send({
      currentUser: payload
    });
  } catch (err) {
    return res.send({
      currentUser: null,
    });
  }
});
