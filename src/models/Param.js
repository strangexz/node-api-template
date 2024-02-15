// const {Rela} = require('objection');
const BaseModel = require('../config/model');

class Action extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return 'actions';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['entity', 'action'],
      properties: {
        id: { type: 'integer' },
        entity: { type: 'string', maxLength: 32 },
        name: { type: 'string', maxLength: 32 },
      },
    };
  }
}

module.exports = Action;
