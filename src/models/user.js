import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema)

export default User;