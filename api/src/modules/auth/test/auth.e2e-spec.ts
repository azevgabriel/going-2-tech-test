import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AuthModule } from '../auth.module';

describe('AuthModule (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth (POST) - with no body - should return 400', () => {
    return request(app.getHttpServer()).post('/auth').expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
