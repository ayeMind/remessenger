import { Controller, Get, Post, Res } from '@nestjs/common';

import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly appService: ChatService) {}

  @Get('/api/chat')
  async getMessages(@Res() res) {
    const messages = await this.appService.getMessages();
    res.json(messages);
  }
}
