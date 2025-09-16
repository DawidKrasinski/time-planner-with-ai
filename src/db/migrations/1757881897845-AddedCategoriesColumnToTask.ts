import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCategoriesColumnToTask1757881897845 implements MigrationInterface {
    name = 'AddedCategoriesColumnToTask1757881897845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`categories\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`categories\``);
    }

}
