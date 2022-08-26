/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('productos').del()
  await knex('productos').insert([
    { nombre: "Calculadora", precio: "30000", foto: "https://cdn2.iconfinder.com/data/icons/unigrid-phantom-devices-vol-4/60/017_163_calculator_calculate_device_math-1024.png" }
  ]);
};
