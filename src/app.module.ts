import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    DatabaseModule, 
    ItemsModule
  ]
})
export class AppModule {}
