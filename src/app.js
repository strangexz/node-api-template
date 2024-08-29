const log = require('./config/logger')(module);
const api = require('./api');
const envs = require('./config/enviroments');

const Group = require('../src/models/ParamGroup');

api.listen(envs.portServer, async () => {
  log.info(`Servidor corriendo en el puerto ${envs.portServer}`);
  const group = await Group.query();
  console.log(group);
  const newGroup = await Group.query().insertGraphAndFetch({ name: 'grupo de prueba', isSpecial: false });
  console.log(newGroup);
});
