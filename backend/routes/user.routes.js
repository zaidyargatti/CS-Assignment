import {Router} from 'express';
import { login, uploadProfilePic } from '../controllers/user.controller.js';
import imageUpload from '../middleware/imageupload.middleware.js';
import  protect  from '../middleware/user.middleware.js';

const router = Router();

router.post('/login', login);
router.put('/profile-pic', protect, imageUpload.single('file'), uploadProfilePic);

export default router;
