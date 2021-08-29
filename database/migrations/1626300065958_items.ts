import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ItemsSchema extends BaseSchema {
  protected tableName = "items";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.boolean("state").defaultTo(false);
      table
        .integer("category")
        .unsigned()
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE");
      table
        .integer("owner")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("description");
      table.timestamp("start", { useTz: true });
      table.timestamp("end", { useTz: true });

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
