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

module.exports = { formatedIsoStringDate, formatedTimestamp };
