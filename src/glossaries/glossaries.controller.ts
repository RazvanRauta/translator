import {
  BadRequestException,
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
import { CreateTermDto } from '@/terms/dto/create-term.dto';
import { TermDto } from '@/terms/dto/term.dto';

import { CreateGlossaryDto } from './dto/create-glossary.dto';
import { GlossaryDto } from './dto/glossary.dto';
import { GlossariesService } from './glossaries.service';

@ApiTags('Glossaries')
@Controller({
  path: 'glossaries',
  version: '1',
})
export class GlossariesController {
  constructor(private readonly glossariesService: GlossariesService) {}

  @ApiCreatedResponse({ type: ApiResponse(GlossaryDto) })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createGlossaryDto: CreateGlossaryDto,
  ): Promise<ApiResponseDto<GlossaryDto>> {
    const data = await this.glossariesService.create(createGlossaryDto);
    return { data };
  }

  @ApiOkResponse({ type: ApiResponse(GlossaryDto, { isArray: true }) })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<ApiResponseDto<GlossaryDto[]>> {
    const data = await this.glossariesService.findAll();
    return { data };
  }

  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({ type: ApiResponse(GlossaryDto) })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponseDto<GlossaryDto>> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format');
    }
    const data = await this.glossariesService.findOne(+id);
    return { data };
  }

  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({ type: ApiResponse(TermDto) })
  @HttpCode(HttpStatus.CREATED)
  @Post(':id/terms')
  async createTerm(
    @Param('id') id: string,
    @Body() createTermDto: CreateTermDto,
  ): Promise<ApiResponseDto<TermDto>> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format');
    }
    const data = await this.glossariesService.createTerm(+id, createTermDto);
    return { data };
  }
}
