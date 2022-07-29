import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    googleId:String,
    photo: String,
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: Number,
      enum: [1,2,3],
      default: 1,
    },
    password: {
      type: String,
      trim: true,
      minLength: 8,
      select: false,
    },
  },
  { timestamps: true }
);

const userModel = model('users', userSchema);

export default userModel;
