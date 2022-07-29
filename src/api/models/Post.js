import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postsSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 255,
  },
  description: { type: String, required: true, trim: true, minLength: 8 },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  category: {
    type: String,
    enum: ['unknown', 'general', 'student', 'teacher', 'parent', 'admin'],
    default: 'unknown',
  },
  edited: { type: Boolean, default: false },
});

const postsModel = model('posts', postsSchema);

export default postsModel;
