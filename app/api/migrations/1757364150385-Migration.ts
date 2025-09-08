import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1757364150385 implements MigrationInterface {
    name = 'Migration1757364150385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`priority\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`priority\` DROP COLUMN \`deletedAt\``);
    }

}
