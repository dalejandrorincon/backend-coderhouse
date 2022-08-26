/* ------------------------ Definición paquetes ----------------------- */
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));//Espacio publico en servidor

const productRoutes = require('./routes/products');
const { Server: SocketServer } = require('socket.io');
const { Server: HTTPServer } = require('http');//importo Server, y con : lo renombro

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

const Contenedor = require('./utils/contenedor');
const contenedorProductos = new Contenedor('./dbProductos.json');
const contenedorMensajes = new Contenedor('./dbMensajes.json');
const events = require('./socket_events');

app.use('/producto', productRoutes);

/* ------------------------------- HandleBars ------------------------------- */
const handlebars = require("express-handlebars")

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
/* -------------------------------- WEBSOCKET ------------------------------- */
socketServer.on('connection', (socket) => {
  socket.emit(events.UPDATE_PRODUCTS, contenedorProductos.getAll());
  socket.emit(events.UPDATE_MESSAGES, contenedorMensajes.getAll());
  
  socket.on(events.NEW_PRODUCT, (products) => {
    console.log(products)
    contenedorProductos.save(products);
    socketServer.emit(events.UPDATE_PRODUCTS, contenedorProductos.getAll());
  });

  socket.on(events.POST_MESSAGE,(msg)=>{
    const _msg = {
      ...msg, 
      socket_id: socket.id, 
      date: Date.now()
    };
    console.log(_msg.email);
    if(_msg.email){
      contenedorMensajes.save(_msg);
      socketServer.sockets.emit(events.NEW_MESSAGE,_msg);
    }else{
      res.status(400).send('Debe diligenciar el correo electrónico');
    }
  });
});


const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server escuchando ${PORT}`);
})