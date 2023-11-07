import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Chat, Prisma } from '@prisma/client';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  #clients: Socket[] = [];

  addClient(client: Socket): void {
    this.#clients.push(client);
    // console.log(this.#clients.length)
  }

  removeClient(id: string) {
    this.#clients = this.#clients.filter((client) => client.id !== id);
    // console.log(this.#clients.length)
  }

  getClientId(id: string): Socket {
    return this.#clients.find((client) => client.id === id);
  }

  async createMessage(data: Prisma.MessageCreateInput): Promise<Chat> {
    return await this.prisma.message.create({
      data,
    });
  }

  async getMessages(): Promise<Chat[]> {
    return await this.prisma.message.findMany();
  }
}
