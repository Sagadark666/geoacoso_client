import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("coordinates", (table) => {
    table.increments("id");
    table.datetime("captured_at")
    table.float("latitude");
    table.float("longitude");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("coordinates");
}
