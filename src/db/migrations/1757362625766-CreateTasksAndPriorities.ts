import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksAndPriorities1757362625766 implements MigrationInterface {
    name = 'CreateTasksAndPriorities1757362625766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`priority\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`priority\` DROP COLUMN \`deletedAt\``);
    }

}
