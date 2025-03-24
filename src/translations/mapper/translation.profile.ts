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

import { TranslationDto } from '../dto/translation.dto';
import { Translation } from '../entities/translation.entity';

@Injectable()
export class TranslationProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	get profile(): MappingProfile {
		return (mapper) => {
			createMap(mapper, Translation, TranslationDto);
		};
	}

	protected get mappingConfigurations(): MappingConfiguration[] {
		return [extend(BaseEntity, BaseDto)];
	}
}
