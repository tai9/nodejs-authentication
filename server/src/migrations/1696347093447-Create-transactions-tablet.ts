import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionsTablet1696347093447 implements MigrationInterface {
    name = 'CreateTransactionsTablet1696347093447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(255)`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
