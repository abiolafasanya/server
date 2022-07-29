import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const submissionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: 'assignments',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submission: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const submissionModel = model('submissions', submissionSchema);

export default submissionModel;
