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
      id: { columnName: 'id' },
      key: { maxLength: 128, columnName: 'key' },
      type: { maxLength: 16, columnName: 'type' },
      value: { maxLength: 255, columnName: 'value' },
      description: { maxLength: 32, columnName: 'description' },
      isReadOnly: { columnName: 'is_read_only' },
      isHidden: { columnName: 'is_hidden' },
      group: { columnName: 'group' },
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
      required: ['key', 'value', 'isReadOnly', 'isHidden'],
      properties: {
        id: { type: 'integer', columnName: 'id' },
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
