exports.seed = function (knex) {
  return knex("User").del();
};