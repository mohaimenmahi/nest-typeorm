import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ) {} // EntityManager exposes the methods to interact with the database

  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);

    await this.entityManager.save(item);
  }

  findAll() {
    return this.itemRepository.find()
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOneBy({ id });
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      await this.itemRepository.update(id, updateItemDto)
      return 'Data Updated'
    } catch (err) {
      console.log('Error', err)
      throw new HttpException('Error Occured', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    await this.itemRepository.delete(id)
  }
}
