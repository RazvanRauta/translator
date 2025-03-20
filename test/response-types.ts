import { GlossaryDto } from '@/glossaries/dto/glossary.dto';
import { ApiResponseDto } from '@/shared/dto/api-response.dto';
import { TermDto } from '@/terms/dto/term.dto';
import { TranslationDto } from '@/translations/dto/translation.dto';

export type GlossaryResponse = ApiResponseDto<GlossaryDto>;
export type GlossariesResponse = ApiResponseDto<GlossaryDto[]>;
export type TermResponse = ApiResponseDto<TermDto>;
export type TranslationResponse = ApiResponseDto<TranslationDto>;
