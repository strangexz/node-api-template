const ParamGroup = require('../../src/models/ParamGroup');
const paramGroupData = require('../data/paramsGroups.json');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(ParamGroup.tableName).del();
  await knex(ParamGroup.tableName).insert(paramGroupData);
};
