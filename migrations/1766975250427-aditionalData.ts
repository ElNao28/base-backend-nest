import { MigrationInterface, QueryRunner } from 'typeorm';

export class AditionalData1766975250427 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "roles" (id,name) VALUES ('1','super_admin'), ('2','admin'), ('3','user'); INSERT INTO "users" (firts_name, last_name, second_lastname, email, phone, password) VALUES ( 'test', 'lastname', 'second', 'test123@gmail.com', '1234567890', '$2b$08$Pw/B5Z0dO2Z5pwwBUzSl8eLcdkQKZ4RkmxF2nrpulhVJYN37vP1Ly'); INSERT INTO "users_roles" ("usersId", "rolesId") VALUES ( (SELECT id FROM users WHERE email = 'test123@gmail.com'), (SELECT id FROM roles WHERE name = 'super_admin'));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "roles";`);
  }
}
