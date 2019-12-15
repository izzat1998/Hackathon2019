import { Router } from 'express';
import middleware from '../middlewares/auth';
import category from '../controllers/category';

const router = Router();

router.get('/', middleware, category.getAll);

export default router;