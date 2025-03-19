/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateGlossaryDto } from './../src/glossaries/dto/create-glossary.dto';
import { CreateTermDto } from './../src/terms/dto/create-term.dto';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

describe('GlossariesController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
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

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.sourceLanguageCode).toBe('en');
    expect(response.body.data.targetLanguageCode).toBe('es');
  });

  it('/glossaries (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/glossaries')
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('/glossaries/:id (GET)', async () => {
    const createGlossaryDto: CreateGlossaryDto = {
      sourceLanguageCode: 'en',
      targetLanguageCode: 'de',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/glossaries')
      .send(createGlossaryDto)
      .expect(201);

    const glossaryId = createResponse.body.data.id;

    const response = await request(app.getHttpServer())
      .get(`/glossaries/${glossaryId}`)
      .expect(200);

    expect(response.body.data).toHaveProperty('id', glossaryId);
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

    const glossaryId = createGlossaryResponse.body.data.id;

    const createTermDto: CreateTermDto = {
      sourceTerm: 'hello',
      targetTerm: 'hola',
    };

    const response = await request(app.getHttpServer())
      .post(`/glossaries/${glossaryId}/terms`)
      .send(createTermDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.sourceTerm).toBe('hello');
    expect(response.body.targetTerm).toBe('hola');
  });
});
