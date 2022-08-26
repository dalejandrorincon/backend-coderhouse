/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('productos', table => {
    table.increments('id').primary().notNullable();
    table.string('nombre', 255).notNullable();
    table.string('foto', 255).notNullable();
    table.integer('precio').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('personas');
};


