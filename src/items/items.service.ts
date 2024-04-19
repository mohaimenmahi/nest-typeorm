import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ) {} // EntityManager exposes the methods to interact with the database

  async create(createItemDto: CreateItemDto) {
    try {
      const listing = new Listing({
        ...createItemDto.listing,
        rating: 0
      })
      const tags = createItemDto.tags.map(createTagDto => new Tag(createTagDto))
  
      const item = new Item({
        ...createItemDto,
        tags,
        listing
      });
  
      await this.entityManager.save(item);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return this.itemRepository.find({
      relations: { listing: true, comments: true, tags: true }
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
      // const item = await this.itemRepository.findOneBy({ id })
      // const comments = updateItemDto.comments.map(createCommentDto => new Comment(createCommentDto))
      // item.comments = comments
      // await this.entityManager.save(item)
      // return {
      //   statusCode: HttpStatus.OK,
      //   message: "Data Updated",
      // }

      await this.entityManager.transaction(async transactionEM => { // EM stands for entity manager
        const item = await this.itemRepository.findOneBy({ id })
        const comments = updateItemDto.comments.map(createCommentDto => new Comment(createCommentDto))
        item.comments = comments
        await transactionEM.save(item)

        const tagContent = `${Math.random()}`
        const tag = new Tag({ content: tagContent })

        await transactionEM.save(tag)
      })

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
