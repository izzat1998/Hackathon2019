import { Router } from 'express';
import validate from '../utils/validations/complains';
import middleware from '../middlewares/auth';
import complain from '../controllers/complain';
import upload from '../middlewares/uploads';
import handler from '../middlewares/handler';

const router = Router();

router.get('/', middleware, complain.getAll)
router.get('/user', middleware, complain.getUserComplain)
router.post('/', middleware, upload('image'), validate, complain.create, handler)
router.post('/accept/:id', middleware, complain.approve)
router.post('/reject/:id', middleware, complain.reject)
router.delete('/:id', middleware, complain.delete)

export default router;