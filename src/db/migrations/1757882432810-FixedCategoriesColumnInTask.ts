import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedCategoriesColumnInTask1757882432810 implements MigrationInterface {
    name = 'FixedCategoriesColumnInTask1757882432810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`categories\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`categories\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`categories\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`categories\` json NOT NULL`);
    }

}
