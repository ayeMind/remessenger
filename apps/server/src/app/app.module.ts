import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [AuthModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
