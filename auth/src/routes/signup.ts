import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";

export const signUpRouter = Router();


signUpRouter.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        "Please provide a password with minimum 4 char and max 20 char."
      ),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    if (await User.findOne({ email })) {
      throw new BadRequestError("Email already in used");
    }

    const user = User.build({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, }, process.env.JWT_KEY!)

    req.session = { jwt: token };

    res.status(201).send(user);
  }
);
