import { Router } from 'express';
import controller from '../controllers/submissionController.js';
import auth from '../middleware/auth.js'
import upload from '../utils/uploads.js';
const router = Router();

router
  .get('/', auth, controller.allSubmissions)
  .get('/:id', auth, controller.getSingleSubmission)
  .post('/', auth, upload.single('upload'), controller.submit)
  .put('/:id', auth, upload.single('upload'), controller.editSubmission)
  .delete('/:id', auth, controller.removeSubmission);

export default router;
