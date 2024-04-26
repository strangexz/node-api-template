const { faker } = require('@faker-js/faker');
const _ = require('underscore');

const ParamGroup = require('../ParamGroup');
const factories = require('../../../test/factories');

const names = [];
const paramsGroups = [];

for (let i = 0; i < 5; i++) {
  let name;
  do {
    name = faker.lorem.sentence(5);
  } while (_.contains(names, name));

  names.push(name);
}

for (const name of names) {
  const paramGroup = {
    name,
    isSpecial: faker.datatype.boolean(),
  };

  paramsGroups.push(paramGroup);
}

describe('Param Group Model unit test', () => {
  describe.each([
    ['first', paramsGroups[0]],
    ['second', paramsGroups[1]],
    ['third', paramsGroups[2]],
    ['fourth', paramsGroups[3]],
    ['fifth', paramsGroups[4]],
  ])('%s group', (input, expected) => {
    let newParamGroup;
    let { name, isSpecial } = expected;

    beforeAll(async () => {
      const sampleSize = 3;
      const groups = factories.paramsGroups.buildList(sampleSize);
      console.log(groups);
      console.log(process.env.NODE_ENV);
      let oGroup = await ParamGroup.query();
      console.log(oGroup);
      newParamGroup = await ParamGroup.query().insertGraphAndFetch(expected);
    });

    it('should have a id', () => {
      expect(newParamGroup.id).toBeDefined();
      expect(newParamGroup.id).toEqual(expect.any(Number));
    });

    it(`should have name`, () => {
      expect(newParamGroup.name).toBe(name);
      expect.stringContaining(newParamGroup.name);
    });

    it(`should have isSpecial`, () => {
      expect(newParamGroup.isSpecial).toBeDefined();
      expect(newParamGroup.isSpecial).toBe(isSpecial);
      expect(_.isBoolean(newParamGroup.isSpecial)).toBeTruthy();
    });

    it(`should have createdAt`, () => {
      expect(newParamGroup.createdAt).toBeDefined();
      expect(_.isDate(newParamGroup.createdAt)).toBeTruthy();
    });

    it(`should have updatedAt`, () => {
      expect(newParamGroup.updatedAt).toBeDefined();
      expect(_.isDate(newParamGroup.updatedAt)).toBeTruthy();
    });

    it('should have relation mapping', () => {
      expect(newParamGroup.relationMappings).toHaveProperty('params');
    });
  });
});
