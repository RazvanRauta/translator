import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

import { LanguageCode } from '@/lang-codes/entities/lang-code.entity';

@ValidatorConstraint({ name: 'isLanguageCode', async: true })
@Injectable()
export class IsLanguageCode implements ValidatorConstraintInterface {
	constructor(private readonly em: EntityManager) {}

	async validate(code: string) {
		const languageCode = await this.em.findOne(LanguageCode, { code });
		return !!languageCode;
	}

	defaultMessage() {
		return 'Language code ($value) is not valid!';
	}
}
