import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7 * 84600, // 7 days
  },
});

const tokenModel = model('tokens', tokenSchema);

export default tokenModel;
