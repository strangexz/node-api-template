// const {Rela} = require('objection');
const BaseModel = require('../config/model');

class Param extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return 'params';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code', 'name'],
      properties: {
        id: { type: 'string', maxLength: 32 },
        code: { type: 'string', maxLength: 32 },
        name: { type: 'string', maxLength: 32 },
        isEnabled: { type: 'boolean', default: true },
      },
    };
  }
}

module.exports = Param;
