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

import { GlossaryDto } from '../dto/glossary.dto';
import { SlimGlossaryDto } from '../dto/slim-glossary.dto';
import { Glossary } from '../entities/glossary.entity';

@Injectable()
export class GlossaryProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	get profile(): MappingProfile {
		return (mapper) => {
			createMap(mapper, Glossary, GlossaryDto);
			createMap(mapper, Glossary, SlimGlossaryDto);
		};
	}

	protected get mappingConfigurations(): MappingConfiguration[] {
		return [extend(BaseEntity, BaseDto)];
	}
}
