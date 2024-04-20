import { AbstractEntity } from '../../database/abstract.entity';
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { Item } from "./item.entity";

@Entity()
export class Comment extends AbstractEntity<Comment> {
  @Column()
  content: string;

  @ManyToOne(() => Item, (item) => item.comments)
  @JoinColumn()
  item: Item
}