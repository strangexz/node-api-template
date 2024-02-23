const { faker } = require('@faker-js/faker');
const { Factory } = require('rosie');

const { dataTypes, getTypeValue } = require('./metadata');
const typeData = faker.helpers.arrayElement(dataTypes);
const params = Factory.define('params_groups')
  .sequence('id')
  .attr('key', faker.database.column())
  .attr('value', getTypeValue(typeData))
  .attr('type', typeData)
  .attr('description', faker.lorem.sentence())
  .attr('group', Math.floor(Math.random() * 5) + 1)
  .attr('is_read_only', faker.datatype.boolean())
  .attr('is_hidden', faker.datatype.boolean())
  .attr('created_at', () => new Date());

module.exports = params;
