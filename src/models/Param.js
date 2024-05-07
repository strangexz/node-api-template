// const {Rela} = require('objection');
const BaseModel = require('../config/model');

class Param extends BaseModel {
  /* El nombre de la table es la única propiedad requerida. */
  static get tableName() {
    return 'params';
  }

  static get idColumn() {
    return 'id';
  }

  static get attributes() {
    return {
      key: { maxLength: 128, columnName: 'key', aRelationMap: false },
      type: { maxLength: 16, columnName: 'type', aRelationMap: false },
      value: { maxLength: 255, columnName: 'value', aRelationMap: false },
      description: { maxLength: 32, columnName: 'description', aRelationMap: false },
      isReadOnly: { columnName: 'is_read_only', aRelationMap: false },
      isHidden: { columnName: 'is_hidden', aRelationMap: false },
      group: { columnName: 'group', aRelationMap: false },
      table: { name: 'params' },
    };
  }

  /**
   * Esquema JSON opcional. Esto no es un esquema de base de datos! Nada es generado
   * en base a esto. Esto solamente se usa para las validaciones. Cada vez que se crea
   * una instancia de modelo es comparada con este esquema. http://json-schema.org/.
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['key', 'type', 'value', 'is_read_only', 'is_hidden'],
      properties: {
        id: { type: 'integer' },
        key: { type: 'string', maxLength: 128 },
        type: { type: 'string', maxLength: 16 },
        value: { type: 'string', maxLength: 255 },
        description: { type: 'string', maxLength: 32 },
        isReadOnly: { type: 'boolean', default: true },
        isHidden: { type: 'boolean', default: false },
      },
    };
  }

  /* Este objeto define las relaciones con otros modelos */
  static get relationMappings() {
    /**
     * Una forma de evitar referencias circulares
     * es requerir las clases de los modelos aquí
     */
    const ParamGroup = require('./ParamGroup');

    return {
      group: {
        relation: BaseModel.BelongsToOneRelation,
        /**
         * Modelo relacionado. Esto puede ser un constructor de una subclase del modelo o
         * la ruta absoluta a un archivo de un módulo que exporta uno.
         */
        modelClass: ParamGroup,
        join: {
          from: 'params.id',
          to: 'paramsGroups.params',
        },
      },
    };
  }
}

module.exports = Param;
