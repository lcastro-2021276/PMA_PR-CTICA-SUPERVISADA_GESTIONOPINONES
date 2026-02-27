'use strict';

import { Router } from 'express';
import { createComment, updateComment, deleteComment } from './comment.controller.js';

const router = Router();

router.post('/create', createComment);
router.put('/update/:id', updateComment);
router.delete('/delete/:id', deleteComment);

export default router;