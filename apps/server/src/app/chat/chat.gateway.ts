import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerListen,
  ServerToClientListen,
} from '../../interfaces/WebSocketListen';
import { Message } from '../../interfaces/Message';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: 'chat',
  //  ws://localhost:{port}/chat
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
    throw new Error('Method not implemented.');
  }

  @WebSocketServer() server: Server<ClientToServerListen, ServerToClientListen>;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message) {
    this.server.emit('message', message);
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
