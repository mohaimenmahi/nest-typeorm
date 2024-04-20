import { MigrationInterface, QueryRunner } from "typeorm";
import { Logger } from "@nestjs/common";

export class PublicItems1713612222593 implements MigrationInterface {
    private readonly logger = new Logger(PublicItems1713612222593.name)

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up method is  called')
        await queryRunner.query(`UPDATE item SET public = true`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Down method is called')
    }
}