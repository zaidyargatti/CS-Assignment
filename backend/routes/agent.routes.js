import {Router} from 'express';
import { createAgent, getAgents } from '../controllers/agent.controller.js';
import  protect  from '../middleware/user.middleware.js';

const router = Router();
router.post('/create-agent', protect, createAgent);
router.get('/get-agents', protect, getAgents);

export default router;
