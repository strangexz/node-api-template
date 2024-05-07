const { faker } = require('@faker-js/faker');
const _ = require('underscore');
const validator = require('validator');

const ParamGroup = require('../ParamGroup');
const factories = require('../../../test/factories');

const names = [];
const paramsGroups = [];

// for (let i = 0; i < 5; i++) {
//   let name;
//   do {
//     name = faker.lorem.sentence(5);
//   } while (_.contains(names, name));

//   names.push(name);
// }

// for (const name of names) {
//   const paramGroup = {
//     name,
//     isSpecial: faker.datatype.boolean(),
//   };

//   paramsGroups.push(paramGroup);
// }
for (let i = 0; i < 5; i++) {
  const newGroup = factories.paramsGroups.build();
  paramsGroups.push(newGroup);
}

console.log(paramsGroups);

describe('Param Group Model unit test', () => {
  describe.each([
    ['first', paramsGroups[0]],
    ['second', paramsGroups[1]],
    ['third', paramsGroups[2]],
    ['fourth', paramsGroups[3]],
    ['fifth', paramsGroups[4]],
  ])('%s group', (input, expected) => {
    let newParamGroup;
    let { name, isSpecial, params } = expected;

    beforeAll(async () => {
      newParamGroup = await ParamGroup.query().insertGraphAndFetch(expected);
      console.log(newParamGroup);
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
      console.log(newParamGroup.isSpecial);
      if (_.isBoolean(newParamGroup.isSpecial)) {
        expect(_.isBoolean(newParamGroup.isSpecial)).toBeTruthy();
        expect(newParamGroup.isSpecial).toBe(isSpecial);
      } else {
        expect(_.isNumber(newParamGroup.isSpecial)).toBeTruthy();
        // expect(newParamGroup.isSpecial).toBe(isSpecial);
      }
    });

    it(`should have createdAt`, () => {
      expect(newParamGroup.createdAt).toBeDefined();
      console.log(newParamGroup.createdAt);
      if (_.isDate(newParamGroup.createdAt)) {
        expect(_.isDate(newParamGroup.createdAt)).toBeTruthy();
      } else {
        expect(validator.isISO8601(newParamGroup.createdAt)).toBeTruthy();
      }
    });

    it(`should have updatedAt`, () => {
      expect(newParamGroup.updatedAt).toBeDefined();
      console.log(newParamGroup.updatedAt);
      if (_.isDate(newParamGroup.updatedAt)) {
        expect(_.isDate(newParamGroup.updatedAt)).toBeTruthy();
      } else {
        expect(validator.isISO8601(newParamGroup.updatedAt)).toBeTruthy();
      }
    });

    it('should have relation mapping', () => {
      expect(newParamGroup.relationMappings).toHaveProperty('params');
    });
  });
});
