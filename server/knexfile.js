const credentials = require('./config/dbCrendentials');
const knexSnakeCaseMapper = require('objection').knexSnakeCaseMappers;

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: credentials.database,
      user: credentials.user,
      password: credentials.password
    }
  },
  ...knexSnakeCaseMapper()


};