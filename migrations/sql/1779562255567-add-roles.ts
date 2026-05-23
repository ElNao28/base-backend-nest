import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoles1779562255567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "rol" (id,name) VALUES (1,'super_admin'), (2,'admin'), (3,'user')
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "rol" WHERE id = 1`);
    await queryRunner.query(`DELETE FROM "rol" WHERE id = 2`);
    await queryRunner.query(`DELETE FROM "rol" WHERE id = 3`);
  }
}
