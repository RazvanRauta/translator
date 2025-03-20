import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { LangCodeDto } from '@/lang-codes/dto/lang-code.dto';
import { BaseDto } from '@/shared/dto/base.dto';
import { TermDto } from '@/terms/dto/term.dto';

export class GlossaryDto extends BaseDto {
  @AutoMap(() => LangCodeDto)
  @ApiProperty({ type: LangCodeDto })
  sourceLanguageCode: LangCodeDto;

  @AutoMap(() => LangCodeDto)
  @ApiProperty({ type: LangCodeDto })
  targetLanguageCode: LangCodeDto;

  @AutoMap(() => [TermDto])
  @ApiProperty({ type: TermDto, isArray: true })
  terms: TermDto[];
}
