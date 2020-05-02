exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("ID");
      table.string("firstName");
      table.string("lastName");
      table.string("email").unique();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.string("password");
      table.boolean("isActive").defaultTo('1');
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user");
}