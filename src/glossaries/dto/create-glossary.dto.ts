import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';

import { IsLanguageCode } from '../../shared/validators/is-language-code.validator';

export class CreateGlossaryDto {
  @ApiProperty({ example: 'en' })
  @IsString()
  @Validate(IsLanguageCode)
  sourceLanguageCode!: string;

  @ApiProperty({ example: 'es' })
  @IsString()
  @Validate(IsLanguageCode)
  targetLanguageCode!: string;
}
