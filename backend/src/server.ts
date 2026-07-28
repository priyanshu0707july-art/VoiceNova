import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import pino from 'pino';

// Load environment variables
dotenv.config();

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const app = express();
const httpServer = createServer(app);

// Setup Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Import and use routes
import authRoutes from './routes/auth';
import meetingRoutes from './routes/meetings';
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/meetings', meetingRoutes);

// Socket.IO setup
import { setupSockets } from './sockets';
setupSockets(io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
