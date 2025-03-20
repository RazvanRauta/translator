import { GlossaryDto } from '@/glossaries/dto/glossary.dto';
import { ApiResponseDto } from '@/shared/dto/api-response.dto';
import { TermDto } from '@/terms/dto/term.dto';

export type GlossaryResponse = ApiResponseDto<GlossaryDto>;
export type GlossariesResponse = ApiResponseDto<GlossaryDto[]>;
export type TermResponse = ApiResponseDto<TermDto>;
