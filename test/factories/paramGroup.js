const { faker } = require('@faker-js/faker');
const _ = require('underscore');

const names = [];
const paramsGroups = [];

for (let i = 0; i < 5; i++) {
  let name;
  do {
    name = faker.hacker.adjective();
  } while (_.contains(names, name));

  names.push(name);
}

for (const name of names) {
  const paramGroup = {
    name,
    special: faker.datatype.boolean(),
  };

  paramsGroups.push(paramGroup);
}

module.exports = paramsGroups;
