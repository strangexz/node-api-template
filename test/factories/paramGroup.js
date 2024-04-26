const { faker } = require('@faker-js/faker');
const { Factory } = require('rosie');

const paramGroupModel = require('../../src/models/ParamGroup');

const paramsGroups = Factory.define(paramGroupModel.attributes.table.name)
  .sequence('id')
  .attr(paramGroupModel.attributes.name.columnName, faker.hacker.adjective())
  .attr(paramGroupModel.attributes.isSpecial.columnName, faker.datatype.boolean())
  .attr('updated_at', () => new Date())
  .attr('created_at', () => new Date());

module.exports = paramsGroups;
