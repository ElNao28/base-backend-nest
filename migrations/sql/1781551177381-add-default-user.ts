import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultUser1781551177381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (name,lastname,birthdate,phone,email,password,rol_id) 
      VALUES ('base','admin','2000-01-01','0000000000','base123@gmail.com','$2b$08$ddDUbhsWZCyDdPkPQ8WqkeqAOtn4SdTrXUIQ.FcDXHh5Sax2TynUS',1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'base123@gmail.com'`)
  }
}
