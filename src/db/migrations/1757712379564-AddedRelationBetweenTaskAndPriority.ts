import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRelationBetweenTaskAndPriority1757712379564 implements MigrationInterface {
    name = 'AddedRelationBetweenTaskAndPriority1757712379564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`priority\` CHANGE \`deletedAt\` \`name\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`priority\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`priority\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`priority\` CHANGE \`color\` \`color\` varchar(255) NOT NULL DEFAULT '#ffffff'`);
        await queryRunner.query(`ALTER TABLE \`priority\` CHANGE \`order\` \`order\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`priority\` CHANGE \`order\` \`order\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`priority\` CHANGE \`color\` \`color\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`priority\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`priority\` ADD \`name\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`priority\` CHANGE \`name\` \`deletedAt\` datetime(6) NULL`);
    }

}
