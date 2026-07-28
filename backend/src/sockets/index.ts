import { Server, Socket } from 'socket.io';
import { TranslationService } from '../modules/translation/translation.service';
import pino from 'pino';

const logger = pino();
export const userLanguages = new Map<string, string>(); // Maps socket.id -> targetLanguage

export function setupSockets(io: Server) {
  const translationService = new TranslationService(io, userLanguages);

  io.on('connection', (socket: Socket) => {
    logger.info(`User connected to Socket.IO: ${socket.id}`);
    
    // Default language is English until they choose otherwise
    userLanguages.set(socket.id, 'English');

    socket.on('set_language', (lang: string) => {
      userLanguages.set(socket.id, lang);
      logger.info(`Socket ${socket.id} set language to ${lang}`);
    });

    socket.on('join_meeting', (roomName: string) => {
      socket.join(roomName);
      logger.info(`Socket ${socket.id} joined meeting room: ${roomName}`);
    });

    socket.on('audio_chunk', (data: { chunk: ArrayBuffer }) => {
      const buffer = Buffer.from(data.chunk);
      translationService.processAudioChunk(socket, buffer);
    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected from Socket.IO: ${socket.id}`);
      userLanguages.delete(socket.id);
    });
  });
}
