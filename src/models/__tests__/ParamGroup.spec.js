const { faker } = require('@faker-js/faker');
const _ = require('underscore');
const validator = require('validator');

const ParamGroup = require('../ParamGroup');
const factories = require('../../../test/factories');

const paramsGroups = [];
const newParamsGroups = [];
const params = [];

for (let i = 0; i < 5; i++) {
  const newGroup = factories.paramsGroups.build();
  paramsGroups.push(newGroup);
}

for (let j = 0; j < 30; j++) {
  const newParam = factories.params.build();
  params.push(newParam);
}

for (const paramGroup of paramsGroups) {
  const randomParam = [];
  const newParameters = [];
  const counter = faker.number.int({ min: 1, max: 5 });

  for (let k = 0; k < counter; k++) {
    const randomIndex = faker.number.int({ min: 0, max: 29 });
    console.log(randomIndex);
    randomParam.push(params[randomIndex]);
  }

  for (const param of randomParam) {
    param.group = paramGroup.id;
    newParameters.push(param);
  }

  paramGroup.params = newParameters;
  newParamsGroups.push(paramGroup);
}

console.log(newParamsGroups);

describe('Param Group Model unit test', () => {
  describe.each([
    ['first', newParamsGroups[0]],
    ['second', newParamsGroups[1]],
    ['third', newParamsGroups[2]],
    ['fourth', newParamsGroups[3]],
    ['fifth', newParamsGroups[4]],
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
      if (_.isDate(newParamGroup.createdAt)) {
        expect(_.isDate(newParamGroup.createdAt)).toBeTruthy();
      } else {
        expect(validator.isISO8601(newParamGroup.createdAt)).toBeTruthy();
      }
    });

    it(`should have updatedAt`, () => {
      expect(newParamGroup.updatedAt).toBeDefined();
      if (_.isDate(newParamGroup.updatedAt)) {
        expect(_.isDate(newParamGroup.updatedAt)).toBeTruthy();
      } else {
        expect(validator.isISO8601(newParamGroup.updatedAt)).toBeTruthy();
      }
    });

    it('should have relation mapping', () => {
      console.log(newParamGroup);
      expect(newParamGroup.relationMappings).toHaveProperty('params');
    });
  });
});
