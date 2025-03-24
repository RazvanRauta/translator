import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { SlimGlossaryDto } from '@/glossaries/dto/slim-glossary.dto';
import { LangCodeDto } from '@/lang-codes/dto/lang-code.dto';
import { BaseDto } from '@/shared/dto/base.dto';

export class TranslationDto extends BaseDto {
	@AutoMap(() => LangCodeDto)
	@ApiProperty({ type: LangCodeDto })
	sourceLanguageCode!: LangCodeDto;

	@AutoMap(() => LangCodeDto)
	@ApiProperty({ type: LangCodeDto })
	targetLanguageCode!: LangCodeDto;

	@AutoMap(() => String)
	@ApiProperty({ example: 'Hello, world!' })
	sourceText!: string;

	@AutoMap(() => SlimGlossaryDto)
	@ApiProperty({ type: SlimGlossaryDto })
	glossary: SlimGlossaryDto;
}
