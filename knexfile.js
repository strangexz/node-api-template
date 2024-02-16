// Update with your config settings.
const { knexSnakeCaseMappers } = require('objection');
/* Cargando variables de entorno */
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },

    ...knexSnakeCaseMappers(),
  },

  local: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },

    ...knexSnakeCaseMappers(),
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },

    ...knexSnakeCaseMappers(),
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },

    ...knexSnakeCaseMappers(),
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },

    ...knexSnakeCaseMappers(),
  },
};
