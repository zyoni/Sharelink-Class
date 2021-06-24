exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments();
      table.string("name");
      table.string("email");
      table.string("password");
      table.timestamps(false, true);
    })
    .then(() => {
      return knex.schema.createTable(
        "links_users",
        (table) => {
          table.increments();
          table.integer("link_id").unsigned();
          table.foreign("link_id").references("links.id");
          table.integer("user_id").unsigned();
          table.foreign("user_id").references("users.id");
          table.timestamps(false, true);
        }
      );
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("links_users").then(() => {
    return knex.schema.dropTable("users");
  });
};
