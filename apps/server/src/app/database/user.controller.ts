import { Controller, Get, Res } from '@nestjs/common';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/api/users')
  async getUsers(@Res() res) {
    const users = await this.appService.getUsers();
    res.json(users);
  }
}
