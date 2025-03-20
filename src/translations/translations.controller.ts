import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateTranslationDto } from './dto/create-translation.dto';
import { TranslationsService } from './translations.service';

@Controller({
  path: 'translations',
  version: '1',
})
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  async create(@Body() createTranslationDto: CreateTranslationDto) {
    const data = await this.translationsService.create(createTranslationDto);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.translationsService.findOne(id);
    return { data };
  }
}
