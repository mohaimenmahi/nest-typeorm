import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column()
  content: string;
}