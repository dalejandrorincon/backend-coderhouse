/* ------------------------ Definición paquetes ----------------------- */
const express = require('express');
/* ---------------------------- Crea app express --------------------------- */
const app = express();
const productos = [];

/* ------------------------- JSON ------------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* ------------------------------- HandleBars ------------------------------- */
const handlebars = require("express-handlebars")
//Definición motor de plantilla - Configuración Handlebars
const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/layout",//Ruta a plantilla principal
  partialsDir: __dirname + "/views/partials/" //Ruta a plantillas parciales
});
app.engine("hbs", hbs.engine);

app.set('view engine', 'hbs');//Registra el motor de plantillas
app.set('views', './views');//Especifica el directorio de vistas
app.use(express.static("public"));//Espacio publico en servidor

app.get('/', (req, res) => {
  res.render('main', {
    title: "Desafio Manejo de Plantillas - HandleBars",
    message: "Bienvenido"
  });
})
app.post('/productos', (req, res) => {
  const { nombre, precio, foto } = req.body;
  productos.push({ nombre, precio, foto });
  res.redirect('/')
});
app.get('/productos', (req, res) => {
  res.render('productos', { productos });
})
/* ----------------------------------- PUG ---------------------------------- */
// app.set('view engine', 'pug');
// app.set('views', './views')
// app.get('/', (req, res) => {
//   res.render('index', {
//     title: "Desafio Manejo de Plantillas - PUG"
//   })
// })
// app.post('/productos', (req, res) => {
//     const {nombre, precio, foto} = req.body;
//     productos.push({nombre, precio, foto});
//     res.redirect('/')
//   })
// app.get('/productos', (req, res) => {
//   res.render('productos', { productos });
// })
/* ----------------------------------- EJS ---------------------------------- */
// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.render('index', {});
// })
// app.post('/productos', (req, res) => {
//   const {nombre, precio, foto} = req.body;
//   productos.push({nombre, precio, foto});
//   res.redirect('/')
// })
// app.get('/productos', (req, res) => {
//   res.render('productos', { productos });
// })

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server escuchando ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`))