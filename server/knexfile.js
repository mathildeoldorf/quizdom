const credentials = require('./config/dbCredentials');
const knexSnakeCaseMapper = require('objection').knexSnakeCaseMappers;

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: credentials.development.database,
      user: credentials.development.user,
      password: credentials.development.password
    }
  },
  ...knexSnakeCaseMapper()
};