const { faker } = require('@faker-js/faker');
const { Factory } = require('rosie');

const paramGroupModel = require('../../src/models/ParamGroup');
const factoryParam = require('../factories/param');

const params = [];
const paramsCount = faker.number.int({ min: 1, max: 5 });
const { dataTypes, getTypeValue } = require('./metadata');
for (let i = 0; i < paramsCount; i++) {
  const typeData = faker.helpers.arrayElement(dataTypes);
  const newParam = {
    id: i + 4,
    key: faker.database.column(),
    value: getTypeValue(typeData),
    type: typeData,
    is_read_only: faker.datatype.boolean(),
    is_hidden: faker.datatype.boolean(),
    description: faker.lorem.sentence(),
    group: faker.number.int({ min: 1, max: 5 }),
  };

  // const newParam = factories.params.build();
  // params.push(newParam);
  params.push(faker.number.int({ min: 1, max: 5 }));
}

console.log(params);

const paramsGroups = Factory.define(paramGroupModel.attributes.table.name)
  .sequence('id')
  .attr(paramGroupModel.attributes.name.columnName, faker.hacker.adjective())
  .attr(paramGroupModel.attributes.isSpecial.columnName, faker.datatype.boolean())
  .attr(paramGroupModel.attributes.params.columnName, factoryParam.buildList(paramsCount))
  .attr('updated_at', () => new Date().toISOString())
  .attr('created_at', () => new Date().toISOString());

module.exports = paramsGroups;
