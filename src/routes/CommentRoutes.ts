import { Router } from 'express';
import * as commentController from '../controllers/CommentController';

const router = Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getCommentById);
router.post('/', commentController.createComment);

export default router;
