import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndRolTables1779284929008 implements MigrationInterface {
    name = 'CreateUserAndRolTables1779284929008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rol" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "second_lastname" character varying(255), "birthdate" date NOT NULL, "phone" character varying(10) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "status" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "rolId" integer, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ef236db52f60fbe1dc6b83efa8c" FOREIGN KEY ("rolId") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ef236db52f60fbe1dc6b83efa8c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "rol"`);
    }

}
