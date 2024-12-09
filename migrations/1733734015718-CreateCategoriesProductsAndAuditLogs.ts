import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategoriesProductsAndAuditLogsTable1733734015718
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Categories',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'Products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'category_id',
            type: 'integer',
          },
          {
            name: 'sku',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'weight',
            type: 'float',
          },
          {
            name: 'width',
            type: 'float',
          },
          {
            name: 'length',
            type: 'float',
          },
          {
            name: 'height',
            type: 'float',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'float',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['category_id'],
            referencedTableName: 'Categories',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'AuditLogs',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'action',
            type: 'varchar',
          },
          {
            name: 'entity',
            type: 'varchar',
          },
          {
            name: 'details',
            type: 'varchar',
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('AuditLogs');
    await queryRunner.dropTable('Products');
    await queryRunner.dropTable('Categories');
  }
}
