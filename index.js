const fs = require("fs");
const data = fs.readFileSync('./files/desafioManejoArchivos.json','utf-8');
const pets = JSON.parse(data);

pets.dogs.push({
  name: "nelson",
  age: 2
})
/* ---------------------------------- Save ---------------------------------- */
// Leer archivo, validar ID, y asignar nuevo valor de ID
// esto debe entrar a una función a ser llamada.
// fs.writeFileSync('./files/desafioManejoArchivos.json', JSON.stringify(pets, null, 2));
// console.log("Data => ", pets);
/* --------------------------- Obtener un elemento -------------------------- */
// usar find para encontrar el elemento
//const {dogs} = pets;
/* --------------------------- Eliminar especifico -------------------------- */
// Usar filter para filtrar los elementos que no coinciden con el id y reemplazar el archivo
