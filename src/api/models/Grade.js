import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const gradeSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    gradedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    submission: {
      type: Schema.Types.ObjectId,
      ref: 'assignment',
    },
    feedback: {
      type: String,
    },
    graded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const gradeModel = model('grades', gradeSchema);

export default gradeModel;
