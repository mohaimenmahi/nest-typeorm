import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly entityManager: EntityManager) {} // EntityManager exposes the methods to interact with the database

  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);

    await this.entityManager.save(item);
  }

  findAll() {
    return `rolling in the deep blue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
