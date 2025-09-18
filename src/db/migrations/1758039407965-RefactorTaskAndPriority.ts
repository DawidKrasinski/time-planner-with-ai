import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorTaskAndPriority1758039407965 implements MigrationInterface {
    name = 'RefactorTaskAndPriority1758039407965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`priority\` ADD UNIQUE INDEX \`IDX_9658b4dbb2043a4517d7d0e662\` (\`name\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_919654b1263b2fa6b1c5f5a732\` ON \`priority\` (\`order\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_20f1f21d6853d9d20d501636eb\` ON \`task\` (\`name\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_20e9298f20321ae85f85ce9c18\` ON \`task\` (\`startTime\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_65a0782038aeb7d401483dc4c9\` ON \`task\` (\`endTime\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_32250a0cf998b00035f73650ff\` ON \`task\` (\`doneDate\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_32250a0cf998b00035f73650ff\` ON \`task\``);
        await queryRunner.query(`DROP INDEX \`IDX_65a0782038aeb7d401483dc4c9\` ON \`task\``);
        await queryRunner.query(`DROP INDEX \`IDX_20e9298f20321ae85f85ce9c18\` ON \`task\``);
        await queryRunner.query(`DROP INDEX \`IDX_20f1f21d6853d9d20d501636eb\` ON \`task\``);
        await queryRunner.query(`DROP INDEX \`IDX_919654b1263b2fa6b1c5f5a732\` ON \`priority\``);
        await queryRunner.query(`ALTER TABLE \`priority\` DROP INDEX \`IDX_9658b4dbb2043a4517d7d0e662\``);
    }

}
