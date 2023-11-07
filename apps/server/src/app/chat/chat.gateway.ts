import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { Prisma } from '@prisma/client';

@WebSocketGateway({
  namespace: 'chat',
  //    ws://localhost:{port}/chat
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}
  afterInit(server: any) {
    console.log(server);
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    payload: Prisma.ChatCreateInput
  ): Promise<void> {
    await this.chatService.createMessage(payload);
    this.server.emit('message', payload);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    if (!this.chatService.getClientId(client.id)) {
      this.chatService.addClient(client);
    }
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.chatService.removeClient(client.id);
    client.disconnect(true);
  }
}
