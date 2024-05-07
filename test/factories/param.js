const { faker } = require('@faker-js/faker');
const { Factory } = require('rosie');

const paramModel = require('../../src/models/Param');

const { dataTypes, getTypeValue } = require('./metadata');
const typeData = faker.helpers.arrayElement(dataTypes);
const params = Factory.define(paramModel.attributes.table.name)
  .sequence('id')
  .attr(paramModel.attributes.key.columnName, faker.database.column())
  .attr(paramModel.attributes.value.columnName, getTypeValue(typeData))
  .attr(paramModel.attributes.type.columnName, typeData)
  .attr(paramModel.attributes.description.columnName, faker.lorem.sentence())
  .attr(paramModel.attributes.group.columnName, Math.floor(Math.random() * 5) + 1)
  .attr(paramModel.attributes.isReadOnly.columnName, faker.datatype.boolean())
  .attr(paramModel.attributes.isHidden.columnName, faker.datatype.boolean())
  .attr('updated_at', () => new Date().toISOString())
  .attr('created_at', () => new Date().toISOString());

module.exports = params;
