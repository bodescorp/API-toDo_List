import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

// Enumeração dos possíveis estados de uma tarefa
export enum TaskStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskDto {
  /**
   * Um identificador único universal (UUID) para a tarefa.
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  @IsUUID(4)
  @IsString()
  @IsOptional()
  @ApiHideProperty()
  id?: string;

  /**
   * O título da tarefa.
   * Deve ser uma string com comprimento mínimo de 3 caracteres e máximo de 256 caracteres.
   * @example "Completar relatório mensal"
   */
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  /**
   * A descrição detalhada da tarefa.
   * Deve ser uma string com comprimento mínimo de 5 caracteres e máximo de 512 caracteres.
   * @example "Rever dados do último trimestre e redigir análise."
   */
  @IsString()
  @MinLength(5)
  @MaxLength(512)
  description: string;

  /**
   * O status atual da tarefa, representado por um valor da enumeração TaskStatusEnum.
   * Campo opcional para atualizações de status.
   * @example "IN_PROGRESS" or "DONE"
   */
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status?: string;

  /**
   * O identificador único (UUID) do usuário associado à tarefa.
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  // Validador para garantir que seja um UUID válido
  @IsUUID(4)
  @IsString()
  @IsOptional()
  @ApiHideProperty()

  user_id?: string;
}
// Interface para representar os parâmetros de busca de tarefas
export class FindAllParameters {
  /**
   * O título da tarefa para buscar.
   * @example "relatório"
   */
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsOptional()
  title?: string;
  /**
   * O status da tarefa para buscar.
   * @example "IN_PROGRESS" or "DONE"
   * 
   */
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status?: string;
}
// DTO para os parâmetros de rota relacionados a tarefas
export class TaskRouteParameters {
  /**
   * O identificador único (UUID) da tarefa para operações de rota.
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
