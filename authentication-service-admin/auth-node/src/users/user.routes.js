'use strict';

import { Router } from 'express';
import { updateProfile, changePassword } from './user.controller.js';

const router = Router();

router.put('/update', updateProfile);
router.put('/change-password', changePassword);

export default router;