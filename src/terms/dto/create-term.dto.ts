import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTermDto {
  @IsString()
  @IsNotEmpty()
  sourceTerm!: string;

  @IsString()
  @IsNotEmpty()
  targetTerm!: string;
}
