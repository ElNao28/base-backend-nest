import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ResponseRegisterUserDto } from './dto/response-register-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ResponseSignInDto } from './dto/response-sign-in.dto';
import { RegenerateAccessTokenResponseDto } from './dto/regenerate-access-token-response.dto';
import { Public } from './decorators/public-decorator.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: ResponseRegisterUserDto,
  })
  @Public()
  @Post('sign-up')
  public signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @ApiOkResponse({
    type: ResponseSignInDto,
  })
  @Public()
  @Post('sign-in')
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.loginUser(signInDto);
  }

  @ApiResponse({
    type: RegenerateAccessTokenResponseDto,
  })
  @Public()
  @Get('access-token')
  public regenerateAccessToken(@Query('refreshToken') refreshToken: string) {
    return this.authService.regenerateAccessToken(refreshToken);
  }
}
