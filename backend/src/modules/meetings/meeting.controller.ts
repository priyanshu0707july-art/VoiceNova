import { Response } from 'express';
import { AccessToken } from 'livekit-server-sdk';
import { AuthRequest } from '../../middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = async (req: AuthRequest, res: Response) => {
  try {
    const { room } = req.body;
    const user = req.user;

    if (!room) {
      return res.status(400).json({ success: false, error: 'Room name is required' });
    }

    // In a production app, we would query the profiles table for the actual full_name.
    // For V1, we will use the email or a fallback.
    const participantName = user?.email || 'Participant';
    const participantIdentity = user?.id || `anon-${Math.random().toString(36).substring(7)}`;

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: participantIdentity,
        name: participantName,
      }
    );

    at.addGrant({ roomJoin: true, room: room, canPublish: true, canSubscribe: true });

    const token = await at.toJwt();

    res.json({ success: true, token });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
