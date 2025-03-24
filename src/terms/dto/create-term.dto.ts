import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTermDto {
	@ApiProperty({ example: 'source term' })
	@IsString()
	@IsNotEmpty()
	sourceTerm!: string;

	@ApiProperty({ example: 'target term' })
	@IsString()
	@IsNotEmpty()
	targetTerm!: string;
}
