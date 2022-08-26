/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('mensajes').del()
  await knex('mensajes').insert([
    { email: "dalejandrorinconp@gmail.com", mensaje: "Mensaje inicial", socket_id: "QUhTYDmg6IP1QhvFAAAF" }
  ]);
};
