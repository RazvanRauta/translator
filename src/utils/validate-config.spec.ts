import { IsNumber, IsString } from 'class-validator';

import validateConfig from './validate-config';

class TestValidator {
	@IsString()
	name: string;
	@IsNumber()
	age: number;
}

describe('validateConfig', () => {
	it('should validate and return the config object if it is valid', () => {
		const config = {
			name: 'John Doe',
			age: 25,
		};

		const result = validateConfig(config, TestValidator);

		expect(result).toEqual(config);
	});

	it('should throw an error if the config object is invalid', () => {
		const config = {
			name: 'John Doe',
			age: 'test', // Invalid type
		};

		expect(() => validateConfig(config, TestValidator)).toThrow();
	});
});
