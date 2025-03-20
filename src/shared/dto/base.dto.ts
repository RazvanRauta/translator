import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BaseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsOptional()
  @AutoMap(() => String)
  id: string;

  constructor(data: Partial<BaseDto>) {
    Object.assign(this, data);
  }
}
