const { faker } = require('@faker-js/faker');
const { Factory } = require('rosie');
const _ = require('underscore');

const { dataTypes, randomArray, randomJson } = require('./metadata');
const paramsJson = require('../../database/data/params.json');

const names = [];
const params = paramsJson.map((parameter) => {
  return {
    key: parameter.key,
    value: parameter.value,
    type: parameter.type,
    description: parameter.description,
    group: parameter.group,
    readOnly: parameter.is_read_only,
    hidden: parameter.is_hidden,
  };
});

for (let i = 0; i < 10; i++) {
  let name;
  let randomType;

  do {
    name = faker.database.column();
  } while (_.contains(names, name));

  names.push(name);
  randomType = faker.helpers.arrayElement(dataTypes);

  let param = {
    key: name,
    value: getTypeValue(randomType),
    type: randomType,
    description: faker.lorem.sentence(),
    group: Math.floor(Math.random() * 5) + 1,
    isReadOnly: faker.datatype.boolean(),
    isHidden: faker.datatype.boolean(),
  };

  params.push(param);
}

function getTypeValue(dataype) {
  let value;
  let now;

  switch (dataype) {
    case 'int':
      value = faker.number.int().toString();
      break;
    case 'float':
      value = faker.number.float().toString();
      break;
    case 'date':
      now = new Date();
      value = now.toISOString();
      break;
    case 'text':
      value = faker.lorem.paragraph();
      break;
    case 'boolean':
      value = faker.datatype.boolean().toString();
      break;
    case 'array':
      value = JSON.stringify(faker.number.float());
      break;
    case 'json':
      value = JSON.stringify(randomJson);
      break;
    default:
      value = faker.lorem.text();
      break;
  }

  return value;
}

module.exports = params;
