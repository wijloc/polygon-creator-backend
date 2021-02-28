import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createLockers1614529550428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lockers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'polygon_id',
            type: 'uuid',
          },
          {
            name: 'lat',
            type: 'varchar',
          },
          {
            name: 'lng',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'lockers',
      new TableForeignKey({
        name: 'LockerInPolygon',
        columnNames: ['polygon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'polygons',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lockers', 'LockerInPolygon');

    await queryRunner.dropTable('lockers');
  }
}
