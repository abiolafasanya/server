import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const assignmentModel = model('assignment', assignmentSchema);

export default assignmentModel;
