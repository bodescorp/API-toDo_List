import { IsNumber, IsString } from 'class-validator';
import { Request } from 'express';

export class AuthResponseDto {
  /**
   * O token de autenticação gerado para o usuário.
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  @IsString()
  token: string;
  /**
   * O tempo de expiração do token de autenticação, em segundos.
   * @example 3600
   */
  @IsNumber()
  expiresIn: number;
}

export interface RequestWithUserId extends Request {
  /**
   * Objeto contendo informações do usuário autenticado.
   */
  user: {
    /**
     * Identificador único do usuário (sub = subject).
     * @example "550e8400-e29b-41d4-a716-446655440000"
     */
    sub: string;
    /**
     * Nome de usuário do usuário autenticado.
     * @example "johndoe"
     */
    username: string;
  };
}
