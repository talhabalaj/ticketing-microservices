import { CustomError } from "./custom-error"

export class DatabaseConnectionError extends CustomError {
  reason = "The connection to database errored out."
  statusCode = 500

  constructor() {
    super("Unable to connect to db")

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [
      {
        message: this.reason
      }
    ]
  }
}