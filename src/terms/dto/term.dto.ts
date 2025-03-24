import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from '@/shared/dto/base.dto';

export class TermDto extends BaseDto {
	@AutoMap(() => String)
	@ApiProperty({ example: 'sourceTerm' })
	sourceTerm: string;

	@AutoMap(() => String)
	@ApiProperty({ example: 'targetTerm' })
	targetTerm: string;
	// glossary: GlossaryDto
}
