const { faker } = require('@faker-js/faker');
const { Factory } = require('rosie');

const paramsGroups = Factory.define('params_groups')
  .sequence('id')
  .attr('name', faker.hacker.adjective())
  .attr('is_special', faker.datatype.boolean())
  .attr('updated_at', () => new Date())
  .attr('created_at', () => new Date());

module.exports = paramsGroups;
