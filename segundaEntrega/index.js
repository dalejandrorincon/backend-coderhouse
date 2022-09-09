const connection =  require('./database');
const {Producto} = require('./schema'); 

connection();

//CRUD
Producto.insertMany([
  {
  title: "Costume icon Mexico",
  price: "50000",
  thumbnail: "https://cdn2.iconfinder.com/data/icons/national-clothes/512/taditional_clothes_people_culture_ethnic_costume-41-1024.png",
  stock: "40"
  },
  {
  title: "Costume icon Colombia",
  price: "70000",
  thumbnail: "https://cdn2.iconfinder.com/data/icons/national-clothes/512/taditional_clothes_people_culture_ethnic_costume-01-1024.png",
  stock: "5"
  }
]);