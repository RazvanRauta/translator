import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, Validate } from 'class-validator';

import { IsLanguageCode } from '@/shared/validators/is-language-code.validator';

export class CreateTranslationDto {
  @ApiProperty({ example: 'en' })
  @IsString()
  @Validate(IsLanguageCode)
  sourceLanguageCode!: string;

  @ApiProperty({ example: 'es' })
  @IsString()
  @Validate(IsLanguageCode)
  targetLanguageCode!: string;

  @ApiProperty({ example: 'Hello, world!' })
  @IsString()
  @MaxLength(5000)
  sourceText!: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  glossaryId?: number;
}
