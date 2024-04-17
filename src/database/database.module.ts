import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        database: configService.getOrThrow('DATABASE_NAME'),
        username: configService.getOrThrow('DATABASE_USER'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        autoLoadEntities: true, // for the true flag, TypeORM will automatically load all entities from the entities array
        synchronize: true // configService.getOrThrow('POSTGRES_SYNCHRONIZE'), // for the true flag, TypeORM will automatically create database tables based on the entities array on every application launch. It will be false for production
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
