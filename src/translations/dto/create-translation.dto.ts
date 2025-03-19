import { IsLanguageCode } from '@/shared/validators/is-language-code.validator';
import { IsString, IsOptional, MaxLength, Validate } from 'class-validator';

export class CreateTranslationDto {
  @IsString()
  @Validate(IsLanguageCode)
  sourceLanguageCode!: string;

  @IsString()
  @Validate(IsLanguageCode)
  targetLanguageCode!: string;

  @IsString()
  @MaxLength(5000)
  sourceText!: string;

  @IsOptional()
  glossaryId?: number;
}
