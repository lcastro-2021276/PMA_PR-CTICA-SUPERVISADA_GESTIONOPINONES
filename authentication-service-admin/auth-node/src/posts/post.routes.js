'use strict';

import { Router } from 'express';
import { createPost, updatePost, deletePost } from './post.controller.js';

const router = Router();

router.post('/create', createPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);

export default router;