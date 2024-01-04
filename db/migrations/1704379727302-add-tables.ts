import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTables1704379727302 implements MigrationInterface {
  name = 'AddTables1704379727302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` text NOT NULL, \`last_name\` text NOT NULL, \`user_name\` varchar(200) NOT NULL, \`mail_id\` varchar(200) NOT NULL, \`crypted_password\` text NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, UNIQUE INDEX \`index_mailId_userName\` (\`mail_id\`, \`user_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`created_by\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_b86c5f2b5de1e7a3d2a428cfb55\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_b86c5f2b5de1e7a3d2a428cfb55\``,
    );
    await queryRunner.query(`DROP TABLE \`notes\``);
    await queryRunner.query(
      `DROP INDEX \`index_mailId_userName\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
