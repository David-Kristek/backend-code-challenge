import { Knex } from "knex";

exports.up = function (knex: Knex): Promise<any> {
  return knex.schema.createTable("person", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("email").notNullable();
  });
  // .createTable("")
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema.dropTable('person')
};