import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string
}

interface UserDoc extends mongoose.Document, UserAttrs {
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    this.set('password', await Password.toHash(this.get('password')))
  }

  done()
})

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export { User }