import mongoose from 'mongoose'
import app from './app'

const start = async () => {
  await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
    .catch(console.error)

  app.listen(3000, () => {
    console.log("https://localhost:3000!!!!")
  })
}

start()