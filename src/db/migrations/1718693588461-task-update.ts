import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskUpdate1718693588461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE task
            ADD COLUMN user_id uuid;
        `);
    await queryRunner.query(`
            
            ALTER TABLE task
            ADD CONSTRAINT fk_user
            FOREIGN KEY (user_id) REFERENCES "user"(id ) ON DELETE SET NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('task');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('task', foreignKey);
    await queryRunner.dropColumn('task', 'user_id');
  }
}
