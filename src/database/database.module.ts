import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { config } from 'dotenv';
import * as path from 'path';

config({
  path:
    process.env.NODE_ENV == 'production'
      ? path.resolve(__dirname, '../../.prod.env')
      : process.env.NODE_ENV == 'test'
        ? path.resolve(__dirname, '../../.test.env')
        : path.resolve(__dirname, '../../.env'),
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations',
        // ssl: { rejectUnauthorized: false },
        ssl:
          process.env.APP_ENV === 'staging'
            ? false
            : { rejectUnauthorized: false },
        //   { rejectUnauthorized: false },

        //  logging: process.env.APP_ENV !== 'production' ? true : false,
        extra: {
          min: 5,
          max: 10, // Max connections in the pool
          maxListeners: 20,
          idleTimeoutMillis: 300000, // Close idle connections after 30 seconds
          connectionTimeoutMillis: 80000, // Timeout for acquiring a connection
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: EntityClassOrSchema[]): any {
    return TypeOrmModule.forFeature(models);
  }
}
