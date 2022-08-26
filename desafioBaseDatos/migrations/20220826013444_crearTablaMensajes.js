/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('mensajes', table => {
    table.increments('id').primary().notNullable();
    table.string('email', 255).notNullable();
    table.string('mensaje', 255).notNullable();
    table.integer('socket_id').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
