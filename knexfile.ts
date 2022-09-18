// Update with your config settings.
const { knexSnakeCaseMappers } = require("objection");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: 'localhost', //db
      database: "pokemonDB",
      user: "postgres",
      password: "postgres",
      port: 15432,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    ...knexSnakeCaseMappers,
  },
};
