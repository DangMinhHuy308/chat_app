import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsers } from '../controller/userController.js';
const router = express.Router();

router.get('/', protectRoute,getUsers);


export default router;

