exports.up = function (knex) {
  return knex.schema.createTable("links", (table) => {
    table.increments();
    table.string("title");
    table.string("url");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("links");
};
