import express from 'express';
import productRoutes, { contenedorProductos } from './routes/products.js';
import cartRoutes from './routes/cart.js';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars'
export let administrador = false;
//import { authLogin } from './utils/authLogin.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'));

/* --------------------------------- Router --------------------------------- */
app.use('/api/productos', productRoutes);
app.use('/api/carrito', cartRoutes);

/* ------------------------------- HandleBars ------------------------------- */

//Definición motor de plantilla - Configuración Handlebars
const hbs = handlebars.create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/public/views/layout",//Ruta a plantilla principal
  partialsDir: __dirname + "/public/views/partials/" //Ruta a plantillas parciales
});

app.engine("hbs", hbs.engine);

app.set('view engine', 'hbs');//Registra el motor de plantillas
app.set('views', './public/views');//Especifica el directorio de vistas

app.get('/', (req, res) => {
  res.render('main', {});
});

/* -------------------------------GET LOGIN ------------------------------ */
app.get('/login', function (req, res) {
  administrador = true;
  console.log(`Sesión iniciada: ${administrador}`);
  res.redirect('/api/productos')
});
/* ------------------------------ GET PRODUCTOS ----------------------------- */
productRoutes.get('/', (req, res) => {
  //Listar todos los productos disponibles
  const listaProductos = contenedorProductos.getAll();
  res.render('productos', { listaProductos, administrador });
});

/* ---------------------------- Servidor Express ---------------------------- */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Sesión iniciada: ${administrador}`);
  console.log(`Server escuchando ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`))