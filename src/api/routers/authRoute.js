import { Router } from 'express';
import controller from '../controllers/authController.js';

const router = Router();

router.get('/', function (req, res) {
  res.json('alive');
});
router.post('/signup', controller.register);
router.post('/signin', controller.login);

export default router;
