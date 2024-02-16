const Param = require('../../src/models/Param');
const paramData = require('../data/params.json');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(Param.tableName).del();
  await knex(Param.tableName).insert(paramData);
};
