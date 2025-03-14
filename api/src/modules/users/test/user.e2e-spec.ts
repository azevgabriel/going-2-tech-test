import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPE_ORM_CONFIG, TypeORMDataSource } from 'src/db/typeorm';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { UserModule } from '../users.module';

describe('UserModule (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TYPE_ORM_CONFIG), UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST) - with no body - should return 400', () => {
    return request(app.getHttpServer()).post('/users').expect(400);
  });

  afterAll(async () => {
    if (TypeORMDataSource.isInitialized) {
      await TypeORMDataSource.destroy();
    }
    await app.close();
  });
});
