import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNoteSharesTable1704390167537 implements MigrationInterface {
    name = 'AddNoteSharesTable1704390167537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`note_shares\` (\`id\` int NOT NULL AUTO_INCREMENT, \`note_id\` int NOT NULL, \`shared_to\` int NOT NULL, \`shared_by\` int NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, INDEX \`index_noteId_userId\` (\`note_id\`, \`shared_to\`, \`shared_by\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`note_shares\` ADD CONSTRAINT \`FK_5e1d08d7a1033f2d1d56e33cb3d\` FOREIGN KEY (\`note_id\`) REFERENCES \`note_shares\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`note_shares\` ADD CONSTRAINT \`FK_d290da5efafb723e65edc5693db\` FOREIGN KEY (\`shared_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`note_shares\` ADD CONSTRAINT \`FK_fc0779e6035934bc6a96d9a4bc4\` FOREIGN KEY (\`shared_to\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note_shares\` DROP FOREIGN KEY \`FK_fc0779e6035934bc6a96d9a4bc4\``);
        await queryRunner.query(`ALTER TABLE \`note_shares\` DROP FOREIGN KEY \`FK_d290da5efafb723e65edc5693db\``);
        await queryRunner.query(`ALTER TABLE \`note_shares\` DROP FOREIGN KEY \`FK_5e1d08d7a1033f2d1d56e33cb3d\``);
        await queryRunner.query(`DROP INDEX \`index_noteId_userId\` ON \`note_shares\``);
        await queryRunner.query(`DROP TABLE \`note_shares\``);
    }

}
