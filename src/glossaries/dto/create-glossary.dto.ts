import { IsString, Validate } from 'class-validator';
import { IsLanguageCode } from '../../shared/validators/is-language-code.validator';

export class CreateGlossaryDto {
  @IsString()
  @Validate(IsLanguageCode)
  sourceLanguageCode!: string;

  @IsString()
  @Validate(IsLanguageCode)
  targetLanguageCode!: string;
}
