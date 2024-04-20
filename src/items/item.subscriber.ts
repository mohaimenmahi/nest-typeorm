/** Event subscription allows us to listen to the events 
that are emitted by the entity manager and to respond to them progrtamatically.
Marks a class as an event subscriber which can listen to specific entity events or any entity events. 
Events are firing using QueryBuilder and repository/manager methods.
*/

import { EventSubscriber, EntitySubscriberInterface, DataSource, InsertEvent } from "typeorm";
import { Item } from "./entities/item.entity";
import { Logger } from  "@nestjs/common";

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
    /* when the ItemSubscriber is instantiated, 
    the injected Datasource instance will 
    have the subscriber pushed to its subscribers array. */
  }

  listenTo(): string | Function {
    return Item;
  }

  beforeInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log(`beforeInsert`, JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log(`afterInsert`, JSON.stringify(event.entity));
  }
}