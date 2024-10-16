import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeColumnToUsers1729088294268 implements MigrationInterface {
    name = 'AddAgeColumnToUsers1729088294268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`provider\` int NOT NULL DEFAULT 1, \`avatar\` varchar(255) NOT NULL DEFAULT 1, \`google_id\` varchar(255) NOT NULL DEFAULT 1, \`permission\` varchar(255) NOT NULL DEFAULT 1, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
