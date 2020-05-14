exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("ID").primary().unsigned().notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").unique().notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.string("password").notNullable();
    table.boolean("isActive").defaultTo("1").notNullable();
    table.string("token");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};