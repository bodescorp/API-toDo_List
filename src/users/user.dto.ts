import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UserDto {
  /**
  Um identificador único universal (UUID) para o usuário. Este campo é gerado automaticamente pelo sistema e é usado para identificar unicamente cada usuário de forma global.
  @example 550e8400-e29b-41d4-a716-446655440000
  *   
  */
  @IsUUID(4)
  @IsOptional()
  @ApiHideProperty()
  id?: string;
  /**
   * O nome de usuário escolhido pelo utilizador para login. Este campo deve ser único e facilmente reconhecível.
   * @example Jorge
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  username: string;
  /**
   * A senha associada ao usuário para fins de autenticação. Deve ser armazenada de forma segura, preferencialmente usando técnicas de hashing.
   * @example 123@abc
   */
  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password: string;
}
