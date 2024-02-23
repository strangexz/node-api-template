const _ = require('underscore');

/**
 * Devuelve fecha ISO formateada
 *
 * Obtiene una cadena de caracteres con una fecha en formato ISO y la devuelve formateada de la siguiente
 * forma: YYYY-MM-DD HH:mm:ss
 *
 * @param {String} isoStringDate - Cadena de caracteres de fecha en formato ISO
 * @returns Cadena de caracteres con una fecha en formato YYYY-MM-DD HH:mm:ss
 */
const formatedIsoStringDate = (isoStringDate) => isoStringDate.replace(/T/, ' ').replace(/\..+/, '');

/**
 * Devuelve marca de tiempo formateada
 *
 * Genera una marca de tiempo del momento de la invocación del método y lo devuelve como una cadena
 * de caracteres con formato YYYY-MM-DD HH:mm:ss
 *
 * @returns Devuelve una cadena de caracteres de una fecha con formato YYYY-MM-DD HH:mm:ss
 */
const formatedTimestamp = () => new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

/**
 * Cambia Camel Case a Snake Case
 *
 * Obtiene una cade de caracteres en camel case y devuelve otra cadena de caracteres
 * transformada a snake case
 *
 * @param {String} str - Cadena de caracteres en camel case
 * @returns Devuelve una cadena de caracteres en snake case
 */
const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Contador de atributos
 *
 * Esta función se encarga de contar la cantidad de atributos de un modelo,
 * validando si este tien ciertos atributos especiales
 *
 * @alias countAttributes
 * @param {Object} attributes - arreglo de atributos del modelo
 * @param {Boolean} hasUUID - tiene un UUID?
 * @param {Boolean} hasCreatedAt - tiene una fecha de creación?
 * @param {Boolean} hasUpdatedAt - tiene una fecha de actualización?
 * @returns {Object} devuelve un objeto con la cantidad total de atributos y un arreglo con sus llaves
 */
const countAttributes = (attributes, hasUUID, hasCreatedAt, hasUpdatedAt) => {
  let attributesCount = Object.keys(attributes).length;
  let attributesNames = Object.keys(attributes);
  const attributesColumnNames = [];

  for (const key in attributes) {
    if (Object.hasOwnProperty.call(attributes, key)) {
      const element = attributes[key];

      if (_.isUndefined(element.columnName)) {
        attributesNames = _.without(attributesNames, key);
        attributesCount -= 1;
      } else if (element.aRelationMap === true) {
        attributesNames = _.without(attributesNames, key);
        attributesCount -= 1;
      } else {
        attributesColumnNames.push(element.columnName);
      }
    }
  }

  // si el ID es un UUID ya viene en el conteo de atributos del modelo
  // si no lo es es autoincremental y debe agregarse
  if (hasUUID === false) {
    attributesCount += 1;
    attributesNames.push('id');
    attributesColumnNames.push('id');
  }

  if (hasCreatedAt === true) {
    attributesCount += 1;
    attributesNames.push('created_at');
    attributesColumnNames.push('created_at');
  }

  if (hasUpdatedAt === true) {
    attributesCount += 1;
    attributesNames.push('updated_at');
    attributesColumnNames.push('updated_at');
  }

  return { attributesCount, attributesNames, attributesColumnNames };
};

module.exports = { formatedIsoStringDate, formatedTimestamp, camelToSnakeCase, countAttributes };
