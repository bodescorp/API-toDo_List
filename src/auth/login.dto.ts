import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  /**
   * O nome de usuário fornecido pelo usuário para login.
   * @example "johndoe"
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  username: string;
  /**
   * A senha fornecida pelo usuário para autenticação.
   * @example "s3cr3tP@ssw0rd"
   */
  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password: string;
}
