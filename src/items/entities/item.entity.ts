import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';
import { Listing } from './listing.entity';
import { Comment } from './comment.entity';

@Entity()
export class Item extends AbstractEntity<Item> {
  @Column()
  name: string;

  @Column({ default: true})
  public: boolean;

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[]
}
