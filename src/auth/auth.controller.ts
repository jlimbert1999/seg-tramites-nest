import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { userRequest } from './interfaces/payload.interface';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @Get()
  @Auth()
 async checkAuthStatus(@GetUser('id_account') id_account: string) {
    const data = await this.authService.checkAuthStatus(id_account)
    return data
  }

}
