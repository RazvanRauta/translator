import { MikroORM } from '@mikro-orm/postgresql';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { CreateGlossaryDto } from './../src/glossaries/dto/create-glossary.dto';
import { CreateTermDto } from './../src/terms/dto/create-term.dto';
import {
  GlossariesResponse,
  GlossaryResponse,
  TermResponse,
} from './response-types';
import { clearDatabase } from './utils/clearDatabase';

describe('GlossariesController (e2e)', () => {
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

  afterEach(async () => {
    await clearDatabase(orm);
  });

  it('/glossaries (POST)', async () => {
    const createGlossaryDto: CreateGlossaryDto = {
      sourceLanguageCode: 'en',
      targetLanguageCode: 'es',
    };

    const response = await request(app.getHttpServer())
      .post('/glossaries')
      .send(createGlossaryDto)
      .expect(201);

    const responseBody = response.body as GlossaryResponse;
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data.sourceLanguageCode.code).toBe('en');
    expect(responseBody.data.targetLanguageCode.code).toBe('es');
  });

  it('/glossaries (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/glossaries')
      .expect(200);

    const responseBody = response.body as GlossariesResponse;
    expect(responseBody.data).toBeInstanceOf(Array);
  });

  it('/glossaries/:id (GET)', async () => {
    const createGlossaryDto: CreateGlossaryDto = {
      sourceLanguageCode: 'en',
      targetLanguageCode: 'es',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/glossaries')
      .send(createGlossaryDto)
      .expect(201);

    const glossaryResponseBody = createResponse.body as GlossaryResponse;
    const glossaryId = glossaryResponseBody.data.id;

    const response = await request(app.getHttpServer())
      .get(`/glossaries/${glossaryId}`)
      .expect(200);

    const responseBody = response.body as GlossaryResponse;
    expect(responseBody.data).toHaveProperty('id', glossaryId);
  });

  it('/glossaries/:id/terms (POST)', async () => {
    const createGlossaryDto: CreateGlossaryDto = {
      sourceLanguageCode: 'en',
      targetLanguageCode: 'es',
    };

    const createGlossaryResponse = await request(app.getHttpServer())
      .post('/glossaries')
      .send(createGlossaryDto)
      .expect(201);

    const glossaryResponseBody =
      createGlossaryResponse.body as GlossaryResponse;
    const glossaryId = glossaryResponseBody.data.id;

    const createTermDto: CreateTermDto = {
      sourceTerm: 'hello',
      targetTerm: 'hola',
    };

    const response = await request(app.getHttpServer())
      .post(`/glossaries/${glossaryId}/terms`)
      .send(createTermDto)
      .expect(201);

    const responseBody = response.body as TermResponse;
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data.sourceTerm).toBe('hello');
    expect(responseBody.data.targetTerm).toBe('hola');
  });
});
