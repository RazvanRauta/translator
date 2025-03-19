import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GlossariesService } from './glossaries.service';
import { CreateGlossaryDto } from './dto/create-glossary.dto';
import { CreateTermDto } from '@/terms/dto/create-term.dto';

@Controller({
  path: 'glossaries',
  version: '1',
})
export class GlossariesController {
  constructor(private readonly glossariesService: GlossariesService) {}

  @Post()
  async create(@Body() createGlossaryDto: CreateGlossaryDto) {
    const data = await this.glossariesService.create(createGlossaryDto);
    return { data };
  }

  @Get()
  async findAll() {
    const data = await this.glossariesService.findAll();
    return { data };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const data = this.glossariesService.findOne(id);
    return { data };
  }

  @Post(':id/terms')
  async createTerm(
    @Param('id') id: number,
    @Body() createTermDto: CreateTermDto,
  ) {
    return this.glossariesService.createTerm(id, createTermDto);
  }
}
