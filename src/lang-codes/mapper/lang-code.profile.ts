import {
  createMap,
  extend,
  Mapper,
  MappingConfiguration,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BaseDto } from '@/shared/dto/base.dto';
import { BaseEntity } from '@/shared/entities/base-entity';

import { LangCodeDto } from '../dto/lang-code.dto';
import { LanguageCode } from '../entities/lang-code.entity';

@Injectable()
export class LangCodeProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, LanguageCode, LangCodeDto);
    };
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    return [extend(BaseEntity, BaseDto)];
  }
}
