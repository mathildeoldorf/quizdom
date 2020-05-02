const credentials = require('./config/dbcrendentials');
const knexSnakeCaseMapper = require('objection').knexSnakeCaseMappers;

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: credentials.database,
      user:     credentials.user,
      password: credentials.password
    }
  },
  ...knexSnakeCaseMapper()
  

};

