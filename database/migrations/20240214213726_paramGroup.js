const ParamGroup = require('../../src/models/ParamGroup');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(ParamGroup.tableName, (table) => {
    table.increments('id');
    table.string(ParamGroup.attributes.name.columnName, ParamGroup.attributes.name.maxLength);
    table.boolean(ParamGroup.attributes.isSpecial.columnName);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(ParamGroup.tableName);
};
