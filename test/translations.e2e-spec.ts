import { MikroORM } from '@mikro-orm/postgresql';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CreateGlossaryDto } from '@/glossaries/dto/create-glossary.dto';
import { CreateTermDto } from '@/terms/dto/create-term.dto';

import { AppModule } from './../src/app.module';
import { CreateTranslationDto } from './../src/translations/dto/create-translation.dto';
import { GlossaryResponse, TranslationResponse } from './response-types';
import { clearDatabase } from './utils/clearDatabase';

const createGlossaryDto: CreateGlossaryDto = {
	sourceLanguageCode: 'en',
	targetLanguageCode: 'es',
};

async function createDefaultGlossary(app: NestFastifyApplication) {
	return await request(app.getHttpServer())
		.post('/glossaries')
		.send(createGlossaryDto)
		.expect(201);
}

describe('TranslationsController (e2e)', () => {
	let app: NestFastifyApplication;
	let orm: MikroORM;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		orm = app.get(MikroORM);
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		await clearDatabase(orm);
	});

	it('/translations (POST)', async () => {
		await createDefaultGlossary(app);

		const createTranslationDto: CreateTranslationDto = {
			sourceLanguageCode: 'en',
			targetLanguageCode: 'es',
			sourceText: 'Hello world',
		};

		const response = await request(app.getHttpServer())
			.post('/translations')
			.send(createTranslationDto)
			.expect(201);

		const responseBody = response.body as TranslationResponse;
		expect(responseBody.data).toHaveProperty('id');
		expect(responseBody.data.sourceLanguageCode.code).toBe('en');
		expect(responseBody.data.targetLanguageCode.code).toBe('es');
		expect(responseBody.data.sourceText).toBe('Hello world');
	});

	it('/translations/:id (GET) - id not found', async () => {
		const response = await request(app.getHttpServer())
			.get(`/translations/10`)
			.expect(404);

		expect(response.body).toMatchObject({
			statusCode: 404,
			error: 'Not Found',
			message: 'Translation with id: 10 not found',
		});
	});

	it('/translations/:id (GET)', async () => {
		await createDefaultGlossary(app);
		const createTranslationDto: CreateTranslationDto = {
			sourceLanguageCode: 'en',
			targetLanguageCode: 'es',
			sourceText: 'Hello world',
		};

		const createResponse = await request(app.getHttpServer())
			.post('/translations')
			.send(createTranslationDto)
			.expect(201);

		const translationResponseBody = createResponse.body as TranslationResponse;
		const translationId = translationResponseBody.data.id;

		const response = await request(app.getHttpServer())
			.get(`/translations/${translationId}`)
			.expect(200);

		const responseBody = response.body as TranslationResponse;
		expect(responseBody.data).toHaveProperty('id', translationId);
		expect(responseBody.data.sourceLanguageCode.code).toBe('en');
		expect(responseBody.data.targetLanguageCode.code).toBe('es');
		expect(responseBody.data.sourceText).toBe('Hello world');
	});

	it('/translations/:id (GET) - should highlight glossary terms in source text', async () => {
		const createGlossaryResponse = await createDefaultGlossary(app);

		const glossaryResponseBody =
			createGlossaryResponse.body as GlossaryResponse;
		const glossaryId = glossaryResponseBody.data.id;

		// Create a term in the glossary
		const createTermDto: CreateTermDto = {
			sourceTerm: 'world',
			targetTerm: 'mundo',
		};

		await request(app.getHttpServer())
			.post(`/glossaries/${glossaryId}/terms`)
			.send(createTermDto)
			.expect(201);

		// Create a translation with the glossary
		const createTranslationDto: CreateTranslationDto = {
			sourceLanguageCode: 'en',
			targetLanguageCode: 'es',
			sourceText: 'Hello world',
			glossaryId: glossaryId,
		};

		const createTranslationResponse = await request(app.getHttpServer())
			.post('/translations')
			.send(createTranslationDto)
			.expect(201);

		const translationResponseBody =
			createTranslationResponse.body as TranslationResponse;
		const translationId = translationResponseBody.data.id;

		const response = await request(app.getHttpServer())
			.get(`/translations/${translationId}`)
			.expect(200);

		const responseBody = response.body as TranslationResponse;
		expect(responseBody.data).toHaveProperty('id', translationId);
		expect(responseBody.data.sourceText).toBe(
			'Hello <HIGHLIGHT>world</HIGHLIGHT>',
		);
	});
});
