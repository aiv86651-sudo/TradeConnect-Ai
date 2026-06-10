import { Router } from 'express';
import * as callController from '../controllers/call.controller.js';

const router = Router();

router.post('/', callController.handleCall);

export default router;
