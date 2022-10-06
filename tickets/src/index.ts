import mongoose from 'mongoose'
import app from './app'

const start = async () => {
  await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets")
    .catch(console.error)

  app.listen(3000, () => {
    console.log("https://localhost:3000!!!!")
  })
}

start()