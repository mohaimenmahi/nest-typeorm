import { Entity, Column } from "typeorm";

import { AbstractEntity } from "src/database/abstract.entity";

@Entity()
export class Listing extends AbstractEntity<Listing> {
  @Column()
  description: string;

  @Column()
  rating: number;
}