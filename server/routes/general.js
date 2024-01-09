import express from 'express';
import { getDashboard, getUser } from '../controllers/general.js';

const router = express.Router();

router.get('/user/:id', getUser);
router.get('/dashboard', getDashboard);

export default router;
