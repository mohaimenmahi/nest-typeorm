import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ) {} // EntityManager exposes the methods to interact with the database

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0
    })
    const item = new Item({
      ...createItemDto,
      comments: [],
      listing
    });

    await this.entityManager.save(item);
  }

  findAll() {
    return this.itemRepository.find({
      relations: { listing: true, comments: true }
    })
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true }
    });
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      const item = await this.itemRepository.findOneBy({ id })
      const comments = updateItemDto.comments.map(createCommentDto => new Comment(createCommentDto))
      item.comments = comments
      await this.entityManager.save(item)
      return {
        statusCode: HttpStatus.OK,
        message: "Data Updated",
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.AMBIGUOUS)
    }
  }

  async remove(id: number) {
    await this.itemRepository.delete(id)
  }
}
