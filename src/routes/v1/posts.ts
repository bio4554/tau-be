import { Router } from 'express';
import * as postsController from '../../controllers/posts.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.post('/', auth, postsController.postNew);
router.get('/', auth, postsController.getAll);

export default router;
