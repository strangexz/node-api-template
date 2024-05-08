const BaseModel = require('../config/model');

class ParamGroup extends BaseModel {
  /* El nombre de la table es la única propiedad requerida. */
  static get tableName() {
    return 'paramsGroups';
  }

  static get idColumn() {
    return 'id';
  }

  static get attributes() {
    return {
      name: { maxLength: 64, columnName: 'name', aRelationMap: false },
      isSpecial: { columnName: 'is_special', aRelationMap: false },
      params: { columnName: 'params', aRelationMap: true },
      table: { name: 'params_groups' },
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
      required: ['name', 'isSpecial'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 64 },
        isSpecial: { type: 'boolean', default: false },
      },
    };
  }

  /* Este objeto define las relaciones con otros modelos */
  static get relationMappings() {
    /**
     * Una forma de evitar referencias circulares
     * es requerir las clases de los modelos aquí
     */
    const Param = require('./Param');

    return {
      params: {
        relation: BaseModel.HasManyRelation,
        /**
         * Modelo relacionado. Esto puede ser un constructor de una subclase del modelo o
         * la ruta absoluta a un archivo de un módulo que exporta uno.
         */
        modelClass: Param,
        join: {
          from: 'paramsGroups.id',
          to: 'params.group',
        },
      },
    };
  }
}

module.exports = ParamGroup;
