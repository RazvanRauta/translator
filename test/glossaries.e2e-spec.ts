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
    const response = await createDefaultGlossary(app);

    const responseBody = response.body as GlossaryResponse;
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data.sourceLanguageCode.code).toBe('en');
    expect(responseBody.data.targetLanguageCode.code).toBe('es');
  });

  it('/glossaries (POST) conflict', async () => {
    const response = await createDefaultGlossary(app);

    const responseBody = response.body as GlossaryResponse;
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data.sourceLanguageCode.code).toBe('en');
    expect(responseBody.data.targetLanguageCode.code).toBe('es');

    const errorResponse = await request(app.getHttpServer())
      .post('/glossaries')
      .send(createGlossaryDto)
      .expect(409);

    expect(errorResponse.body).toMatchObject({
      statusCode: 409,
      error: 'Conflict',
      message: 'Glossary already exists for these language codes',
    });
  });

  it('/glossaries (GET)', async () => {
    await createDefaultGlossary(app);

    const response = await request(app.getHttpServer())
      .get('/glossaries')
      .expect(200);

    const responseBody = response.body as GlossariesResponse;
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data[0].id).toBeDefined();
  });

  it('/glossaries/:id (GET)', async () => {
    const createResponse = await createDefaultGlossary(app);

    const glossaryResponseBody = createResponse.body as GlossaryResponse;
    const glossaryId = glossaryResponseBody.data.id;

    const response = await request(app.getHttpServer())
      .get(`/glossaries/${glossaryId}`)
      .expect(200);

    const responseBody = response.body as GlossaryResponse;
    expect(responseBody.data).toHaveProperty('id', glossaryId);
  });

  it('/glossaries/:id (GET) - id not found', async () => {
    const response = await request(app.getHttpServer())
      .get(`/glossaries/10`)
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      error: 'Not Found',
      message: 'Glossary with id: 10 not found',
    });
  });

  it('/glossaries/:id/terms (POST)', async () => {
    const createGlossaryResponse = await createDefaultGlossary(app);

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

  it('/glossaries/:id/terms (POST) - id is not a number', async () => {
    const createTermDto: CreateTermDto = {
      sourceTerm: 'hello',
      targetTerm: 'hola',
    };

    const response = await request(app.getHttpServer())
      .post(`/glossaries/bla/terms`)
      .send(createTermDto)
      .expect(400);

    expect(response.body).toMatchObject({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Invalid ID format',
    });
  });

  it('/glossaries/:id/terms (POST) - id not found', async () => {
    const createTermDto: CreateTermDto = {
      sourceTerm: 'hello',
      targetTerm: 'hola',
    };

    const response = await request(app.getHttpServer())
      .post(`/glossaries/10/terms`)
      .send(createTermDto)
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      error: 'Not Found',
      message: 'Glossary with id: 10 not found',
    });
  });
});
