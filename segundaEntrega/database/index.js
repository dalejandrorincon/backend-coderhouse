const mongoose = require ("mongoose");
//Hacer conexión con base de datos
async function connection(){
  const URIstring = "mongodb://localhost:27017/products";
  await mongoose.connect(URIstring); 
}

module.exports = connection;