const express = require('express');
const app = express();
const connection = require('./database');
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* --------------------------------- Router --------------------------------- */
const productRoutes = require('./routes/products.js');
app.use('/productos', productRoutes);

/* ------------------------------ GET PRODUCTOS ----------------------------- */
productRoutes.get('/', (req, res) => {
  //Listar todos los productos disponibles
  res.sendFile(__dirname + '/public/index.html');
});

/* ---------------------------- Servidor Express ---------------------------- */
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server escuchando ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`))