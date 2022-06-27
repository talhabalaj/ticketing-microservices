export class DatabaseConnectionError extends Error {
  reason = "The connection to database errored out."
  statusCode = 500

  constructor() {
    super();

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