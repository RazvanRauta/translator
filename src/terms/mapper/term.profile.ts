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

import { TermDto } from '../dto/term.dto';
import { Term } from '../entities/term.entity';

@Injectable()
export class TermProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	get profile(): MappingProfile {
		return (mapper) => {
			createMap(mapper, Term, TermDto);
		};
	}

	protected get mappingConfigurations(): MappingConfiguration[] {
		return [extend(BaseEntity, BaseDto)];
	}
}
