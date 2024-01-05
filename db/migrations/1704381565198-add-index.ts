import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndex1704381565198 implements MigrationInterface {
  name = 'AddIndex1704381565198';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`notes\` CHANGE \`content\` \`content\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`index_userId_content\` ON \`notes\` (\`content\`, \`user_id\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`index_userId_content\` ON \`notes\``);
    await queryRunner.query(`ALTER TABLE \`notes\` DROP COLUMN \`content\``);
  }
}
