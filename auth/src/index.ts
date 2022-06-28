import express, { json } from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'

import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signUpRouter } from './routes/signup'


const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signUpRouter)

app.all('*', () => { throw new NotFoundError() })
app.use(errorHandler)

const start = async () => {
  await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
    .catch(console.error)

  app.listen(3000, () => {
    console.log("https://localhost:3000!!!!")
  })
}

start()