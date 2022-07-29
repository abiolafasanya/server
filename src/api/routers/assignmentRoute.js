import { Router } from 'express';
import controller from '../controllers/assignmentController.js';
import upload from '../utils/uploads.js';
import auth from '../middleware/auth.js'
const router = Router();

router
  .get('/', auth, controller.all)
  .get('/:id', auth, controller.get)
  .post('/', auth, upload.single('upload'), controller.create)
  .put('/:id', auth, upload.single('upload'), controller.update)
  .delete('/:id', auth, controller.remove);

export default router;
