const { faker } = require('@faker-js/faker');

const dataTypes = ['int', 'float', 'text', 'boolean', 'array', 'json', 'date'];
const elementsTypes = ['int', 'float', 'boolean', 'text', 'string'];
const randomArray = [];
const randomJson = {};

for (let index = 0; index < faker.number.int({ min: 3, max: 30 }); index++) {
  randomArray.push(faker.lorem.word);
}
for (let index = 0; index < faker.number.int({ min: 3, max: 30 }); index++) {
  randomJson[faker.lorem.word] = getTypeValue(faker.helpers.arrayElement(elementsTypes));
}

const userDataTest = {
  key: 'testing',
  deletedUserKey: 'deletedUser',
  blockedUserKey: 'blockedUser',
  disabledKey: 'disabledIdentity',
  deletedKey: 'deletedIdentity',
  secret: 'miContrasenia3sSegura!',
  email: faker.internet.email({ firstName: 'activeUser' }),
  blockedEmail: faker.internet.email({ firstName: 'blockedUser' }),
  deletedEmail: faker.internet.email({ firstName: 'deletedUser' }),
  identityProviders: [
    { code: 'USER_AND_PASSWORD', name: 'Usuario y contraseña' },
    { code: 'ACTIVE_DIRECTORY', name: 'Directorio activo' },
    { code: 'GOOGLE', name: 'Directorio activo' },
    { code: 'FACEBOOK', name: 'Directorio activo' },
  ],
  auths: [
    {
      username: 'TestAuthOne',
      password: 'Password123!',
      channel: 'ALLACCESS',
    },
    {
      username: 'TestAuthTwo',
      password: 'Password123!',
      channel: 'RANDOMACCESS',
    },
  ],
};

/**
 *
 * @param {*} dataype
 * @returns
 */
function getTypeValue(dataype) {
  let value;

  switch (dataype) {
    case 'int':
      value = faker.number.int();
      break;
    case 'float':
      value = faker.number.float();
      break;
    case 'text':
      value = faker.lorem.sentence();
      break;
    case 'boolean':
      value = faker.datatype.boolean();
      break;
    case 'string':
      value = faker.lorem.word();
      break;
    default:
      value = faker.lorem.word();
      break;
  }

  return value;
}

module.exports = { dataTypes, userDataTest, randomArray, randomJson, getTypeValue };
