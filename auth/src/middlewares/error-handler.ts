import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error'


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  
  if (res.writableFinished)
    return


  if (err instanceof CustomError)
    res.status(err.statusCode).send({
      errors: err.serializeErrors()
    })

  res.status(500).send({
    errors: [
      {
        message: "Something went wrong"
      }
    ]
  })
}