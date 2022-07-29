import Model from '../models/Submission.js';

class Submission {
  static allSubmissions = async (req, res) => {
    try {
      let assignment = await Model.find();
      if (assignment.length > 0)
        return res.status(200).json({
          success: true,
          message: 'All Submission Found',
          assignment,
        });
      return res.status(400).json({
        success: false,
        message: 'Submissions not found',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error', error: error });
    }
  };

  static getSingleSubmission = async (req, res) => {
    try {
      let id = { _id: req.params.id };
      let assignment = await Model.findOne(id);
      if (assignment)
        return res.status(200).json({
          success: true,
          message: 'Submission found',
          assignment,
        });
      return res.status(400).json({
        success: false,
        message: 'Submission not found',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error', error: error });
    }
  };
  static submit = async (req, res) => {
    try {
      let body = req.body;
      let assignment = await Model.create(body);
      if (assignment)
        return res.status(201).json({
          success: true,
          message: 'Submitted',
          assignment,
        });
      return res.status(400).json({
        success: false,
        message: 'submission failed',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error', error: error });
    }
  };

  static editSubmission = async (req, res) => {
    try {
      let body = req.body;
      let id = { _id: req.params.id };
      let assignment = await Model.findOneAndUpdate(id, body, { new: true });
      if (assignment)
        return res.status(200).json({
          success: true,
          message: 'Submission updated successfully',
          assignment,
        });
      return res.status(400).json({
        success: false,
        message: 'Submission not updated',
        assignment,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: true,
        success: false,
        message: error.message,
      });
    }
  };

  static removeSubmission = async (req, res) => {
    try {
      let id = { _id: req.params.id };
      let assignment = await Model.findOneAndRemove(id);
      if (assignment)
        return res.status(200).json({
          success: true,
          message: 'Assignment deleted',
        });
      return res.status(400).json({
        error: true,
        success: false,
        message: 'Assignment not deleted',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: true,
        success: false,
        message: error.message,
      });
    }
  };
}

export default Submission;
