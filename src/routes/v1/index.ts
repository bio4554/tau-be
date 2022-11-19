import { Router } from "express";
import auth from "./auth";
import posts from "./posts";
import users from "./users";

const router = Router()

router.use('/users', users);
router.use('/auth', auth);
router.use('/posts', posts)

export default router;