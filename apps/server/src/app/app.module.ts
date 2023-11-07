import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './database/user.module';

@Module({
  imports: [ChatModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
