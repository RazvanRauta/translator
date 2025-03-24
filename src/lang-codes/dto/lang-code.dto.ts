import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from '@/shared/dto/base.dto';

export class LangCodeDto extends BaseDto {
	@AutoMap(() => String)
	@ApiProperty({ example: 'en' })
	code: string;

	@AutoMap(() => String)
	@ApiProperty({ example: 'US' })
	country: string;
}
