// this config is needed to run migrations
// this is going to be the datasource that we expose to typeorm cli to actually connect to our database
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from "typeorm";

config()

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DATABASE_HOST'),
  port: configService.getOrThrow('DATABASE_PORT'),
  database: configService.getOrThrow('DATABASE_NAME'),
  username: configService.getOrThrow('DATABASE_USER'),
  password: configService.getOrThrow('DATABASE_PASSWORD'),
  migrations: ['migrations/**/*{.ts,.js}'],
  entities: ['src/**/**.entity{.ts,.js}'],
})