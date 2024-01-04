import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFk1704393862271 implements MigrationInterface {
    name = 'AddFk1704393862271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note_shares\` DROP FOREIGN KEY \`FK_5e1d08d7a1033f2d1d56e33cb3d\``);
        await queryRunner.query(`ALTER TABLE \`note_shares\` ADD CONSTRAINT \`FK_5e1d08d7a1033f2d1d56e33cb3d\` FOREIGN KEY (\`note_id\`) REFERENCES \`notes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note_shares\` DROP FOREIGN KEY \`FK_5e1d08d7a1033f2d1d56e33cb3d\``);
        await queryRunner.query(`ALTER TABLE \`note_shares\` ADD CONSTRAINT \`FK_5e1d08d7a1033f2d1d56e33cb3d\` FOREIGN KEY (\`note_id\`) REFERENCES \`note_shares\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
