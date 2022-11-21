import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/', auth, usersController.getById);
router.post('/', usersController.postNew);

export default router;
