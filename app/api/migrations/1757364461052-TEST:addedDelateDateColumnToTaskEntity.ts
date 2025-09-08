import { MigrationInterface, QueryRunner } from "typeorm";

export class TEST:addedDelateDateColumnToTaskEntity1757364461052 implements MigrationInterface {
    name = 'TEST:addedDelateDateColumnToTaskEntity1757364461052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`deleteAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`deleteAt\``);
    }

}
