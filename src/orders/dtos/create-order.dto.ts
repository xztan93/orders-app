import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
