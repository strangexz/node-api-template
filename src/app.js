const log = require('./config/logger')(module);
const api = require('./api');

api.listen(3000, () => {
  log.info('Servidor corriendo en el puerto 3000');
});
