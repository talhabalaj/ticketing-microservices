import express, { json } from 'express'
import 'express-async-errors'
import session from 'cookie-session'
import mongoose from 'mongoose'

import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signUpRouter } from './routes/signup'
import { signOutRouter } from './routes/signout'


const app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secure: true,
  signed: false,
}))
app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signUpRouter)
app.use(signOutRouter)

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