import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const router = Router();
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const profileSchema = z.object({
  full_name: z.string().min(1),
  avatar_url: z.string().url().optional().or(z.literal(''))
});

router.post('/profile', requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = req.user;
    const body = profileSchema.parse(req.body);
    
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: body.full_name,
        avatar_url: body.avatar_url,
        preferred_language: req.body.preferred_language || 'en'
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: error.message } });
  }
});

export default router;
