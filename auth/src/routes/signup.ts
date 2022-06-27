import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const signUpRouter = Router()

signUpRouter.get('/api/users/signup', [body('email').isEmail().withMessage("Please provide a valid"), body('password').trim().isLength({ min: 4, max: 20 }).withMessage("Please provide a password with minimum 4 char and max 20 char.")], (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  const { email, password } = req.body

  console.log("Creating a user")

  throw new DatabaseConnectionError()

  res.send({})
})