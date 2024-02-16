const _ = require('underscore');
const configuration = require('../../../knexfile')['test'];
const knex = require('knex')(configuration);
const { camelToSnakeCase, countAttributes } = require('../../../src/utils/utillities');

/** Models */
const Param = require('../../../src/models/Param');

let columns;
let columnNames;
let attributesColumnNames;
let hasUUID;
let hasCreatedAt;
let hasUpdatedAt;
let validateAttributes;

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

it('should create params table', async () => {
  const tableName = camelToSnakeCase(Param.tableName);
  const query = `
  SELECT
    name
  FROM
    sqlite_schema
  WHERE
    type ='table' AND
    name = '${tableName}'
  `;

  const tableNames = ['knex_migrations', 'knex_migrations_lock'];
  tableNames.push(tableName);

  const table = await knex.raw(query);

  expect(table[0]).toHaveProperty('name');
  expect(_.contains(tableNames, table[0].name)).toBeTruthy();
});

it('should get list columns of the table params', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${camelToSnakeCase(Param.tableName)})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(Param.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});
