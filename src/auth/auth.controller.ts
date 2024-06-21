import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and generate JWT token' })
  @ApiBody({ type: LoginDto, description: 'The login credentials of the user.' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully.', type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid login credentials.' })
  
  async signIn(
    @Body() data: LoginDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.signIn(data);
  }
}
