import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';

import { ApiResponse, ApiResponseDto } from '@/shared/dto/api-response.dto';

import { CreateTranslationDto } from './dto/create-translation.dto';
import { TranslationDto } from './dto/translation.dto';
import { TranslationsService } from './translations.service';

@ApiTags('Translations')
@Controller({
	path: 'translations',
	version: '1',
})
export class TranslationsController {
	constructor(private readonly translationsService: TranslationsService) {}

	@ApiCreatedResponse({ type: ApiResponse(TranslationDto) })
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@Body() createTranslationDto: CreateTranslationDto,
	): Promise<ApiResponseDto<TranslationDto>> {
		const data = await this.translationsService.create(createTranslationDto);
		return { data };
	}

	@ApiParam({
		name: 'id',
		type: String,
		required: true,
	})
	@ApiOkResponse({ type: ApiResponse(TranslationDto) })
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async findOne(
		@Param('id') id: number,
	): Promise<ApiResponseDto<TranslationDto>> {
		const data = await this.translationsService.findOne(id);
		return { data };
	}
}
