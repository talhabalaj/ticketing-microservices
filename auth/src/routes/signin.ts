import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@tj-tickets/common";
import { User } from "../models/user";
import { Password } from "../services/password";

export const signInRouter = Router();

signInRouter.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").trim().notEmpty().withMessage("Please provide a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await Password.compare(user.password, password))) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = { jwt: token };

    res.status(200).send(user);
  }
);
