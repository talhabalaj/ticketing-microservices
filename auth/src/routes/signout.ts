import { Request, Response, Router } from "express";

export const signOutRouter = Router();

signOutRouter.post(
  "/api/users/signout",
  async (req: Request, res: Response) => {
    req.session = null;

    res.send()
  }
);
