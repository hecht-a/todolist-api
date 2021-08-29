import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CategoriesSchema extends BaseSchema {
  protected tableName = "categories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("uuid").unique().notNullable();
      table.string("name").notNullable();
      table.integer("owner").unsigned().references("id").inTable("users").onDelete("CASCADE");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
