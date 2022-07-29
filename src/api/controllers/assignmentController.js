import Model from '../models/Assignment.js';
import Submission from '../controllers/submissionController.js';

class Assignment extends Submission {
  static all = async (req, res) => {
    try {
      let assignment = await Model.find();
      if (assignment)
        return res.status(200).json({
          success: true,
          message: 'Assignment found',
          assignment,
        });
      return res.status(400).json({
        success: false,
        message: 'Assignments not found',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error', error: error });
    }
  };

  static get = async (req, res) => {
    try {
      let id = { _id: req.params.id };
      let assignment = await Model.findOne(id);
      if (assignment)
        return res.status(200).json({
          success: true,
          message: 'Assignment found',
          assignment,
        });
      return res.status(400).json({
        success: false,
        message: 'Assignment not found',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error', error: error });
    }
  };

  static create = async (req, res) => {
    try {
      let body = req.body;
      let assignment = await Model.create(body);
      if (assignment)
        return res.status(201).json({
          success: true,
          message: 'Assignment Created',
          assignment,
        });
      return res.status(400).json({
        success: false,
        message: 'Assignment not created',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error', error: error });
    }
  };

  static update = async (req, res) => {
    try {
      let body = req.body;
      let id = { _id: req.params.id };
      let assignment = await Model.findOneAndUpdate(id, body, { new: true });
      if (assignment)
        return res.status(200).json({
          success: true,
          message: 'assignment updated successfully',
          assignment,
        });
      return res.status(400).json({
        success: false,
        message: 'Assignment not updated',
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

  static remove = async (req, res) => {
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

export default Assignment;
