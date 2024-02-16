const Param = require('../../src/models/Param');
const ParamGroup = require('../../src/models/ParamGroup');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(Param.tableName, (table) => {
    table.increments('id');
    table.string(Param.attributes.key.columnName, Param.attributes.key.maxLength);
    table.string(Param.attributes.value.columnName, Param.attributes.value.maxLength);
    table.string(Param.attributes.type.columnName, Param.attributes.type.maxLength);
    table.string(Param.attributes.description.columnName, Param.attributes.description.maxLength);
    table.boolean(Param.attributes.isReadOnly.columnName);
    table.boolean(Param.attributes.isHidden.columnName);
    table.integer(Param.attributes.group.columnName).unsigned();
    table.foreign(Param.attributes.group.columnName).references('id').inTable(ParamGroup.tableName);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(Param.tableName);
};
