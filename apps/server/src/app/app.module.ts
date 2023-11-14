import { Module } from '@nestjs/common';
import { diskStorage } from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './database/user.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ChatModule, UserModule,  MulterModule.register({
    storage: diskStorage({
      destination: 'C:/Users/oblom/All/projects/remessenger/apps/client/public', // Папка, куда будут загружены файлы
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
