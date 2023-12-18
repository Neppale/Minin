import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UserIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
