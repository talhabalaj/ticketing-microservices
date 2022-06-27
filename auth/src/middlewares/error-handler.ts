import { Request, Response, NextFunction } from 'express'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  res.status(err.statusCode).send({
    errors: err.serializeErrors()
  })
}