import { table } from "console";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("pokemon", (table) => {
      table.increments("id");
      table.string("name");
      table.string("classification");
      table.string("min_weight");
      table.string("max_weight");
      table.string("min_height");
      table.string("max_height");
      table.float("fleeRate");
      table.integer("maxCP");
      table.integer("maxHP");
    })
    .createTable("type", (table) => {
      table.increments("id").primary();
      table.string("type");
    })
    .createTable("pokemon_types", (table) => {
      table.increments("id").primary();
      table.integer("pokemon_id").references("id").inTable("pokemon");
      table.integer("type_id").references("id").inTable("type");
    })
    .createTable("pokemon_evolutions", (table) => {
      table.increments("id").primary();
      table.integer("pokemon_id").references("id").inTable("pokemon");
      table.integer("evolution_id").references("id").inTable("pokemon");
    })
    .createTable("favorite_pokemons", (table) => {
      table.increments("id").primary();
      table
        .integer("pokemon_id")
        .references("id")
        .inTable("pokemon")
        .notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("pokemon")
    .dropTableIfExists("type")
    .dropTableIfExists("pokemon_types")
    .dropTableIfExists("pokemon_evolutions")
    .dropTableIfExists("favorite_pokemons");
}
