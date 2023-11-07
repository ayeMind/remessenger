import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './database/user.module';

@Module({
  imports: [AuthModule, ChatModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
