import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [ChatGateway, ChatService, PrismaService],
})
export class ChatModule {}
