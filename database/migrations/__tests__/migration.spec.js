const _ = require('underscore');
const configuration = require('../../../knexfile')['test'];
const knex = require('knex')(configuration);

const { camelToSnakeCase } = require('../../../src/utils/utillities');

/** Models */
const Param = require('../../../src/models/Param');
const ParamGroup = require('../../../src/models/ParamGroup');

beforeAll(async () => {
  await knex.migrate
    .latest()
    .then(() => {
      return knex.seed.run();
    })
    .then(() => {
      // migrations are finished
      console.info('Seeder finished!');
    });
});

it('should list all tables', async () => {
  const query = `
  SELECT
    name
  FROM
    sqlite_schema
  WHERE
    type ='table' AND
    name NOT LIKE 'sqlite_%';
  `;

  const tableNames = ['knex_migrations', 'knex_migrations_lock'];
  tableNames.push(camelToSnakeCase(ParamGroup.tableName));
  tableNames.push(camelToSnakeCase(Param.tableName));

  const tables = await knex.raw(query);

  expect(tables.length).toEqual(tableNames.length);

  tables.forEach((table) => {
    expect(table).toHaveProperty('name');
    expect(_.contains(tableNames, table.name)).toBeTruthy();
  });
});
