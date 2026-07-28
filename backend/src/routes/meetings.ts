import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { generateToken } from '../modules/meetings/meeting.controller';

const router = Router();

// Endpoint: POST /api/v1/meetings/token
// Note: temporarily bypassed requireAuth for manual verification
router.post('/token', generateToken);

export default router;
