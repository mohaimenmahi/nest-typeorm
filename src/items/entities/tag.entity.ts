import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column } from "typeorm";

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column({ unique: true })
  content: string;
}