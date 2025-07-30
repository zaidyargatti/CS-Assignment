import {Router} from 'express';
import { uploadCSV, getAgentLists } from '../controllers/list.controller.js';
import csvUpload from '../middleware/csvUpload.middleware.js';
import  protect  from '../middleware/user.middleware.js';

const router = Router();

router.post('/upload', protect, csvUpload.single('file'), uploadCSV);
router.get('/:agentId', protect, getAgentLists);

export default router;
