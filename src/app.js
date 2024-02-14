const log = require('./config/logger')(module);
const api = require('./api');
const envs = require('./config/enviroments');

api.listen(envs.portServer, () => {
  log.info('Servidor corriendo en el puerto 3000');
});
