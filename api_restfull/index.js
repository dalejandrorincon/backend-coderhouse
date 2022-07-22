/* ------------------------ Definición paquetes ----------------------- */
const express = require('express');
const { Router } = express;
const productos = [];
const arrayIds = [];
let id = 1;
/* ---------------------------- Crea app express --------------------------- */
const app = express();

/* ------------------------- Para poder recibir JSON ------------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* --------------------------------- ROUTER --------------------------------- */
const routerProducto = Router();
/* ------------------------------ API RESTFULL ------------------------------ */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})
/* ------------------------------ GET productos ----------------------------- */
routerProducto.get("/", (req, res) => {
  res.json(productos);
});
/* ------------------------------ POST producto ----------------------------- */
routerProducto.post("/", (req, res) => {
  const producto = req.body;
  if (productos.length == 0) {
    producto["id"] = id;
    productos.push(producto);
  } else {
    for (const item in productos) {
      arrayIds.push(productos[item].id);
    }
    let idMax = Math.max(...arrayIds);
    id = idMax + 1;
    producto["id"] = id;
    productos.push(producto);
  }
  res.json(productos);
});
/* --------------------------- GET producto por id -------------------------- */
routerProducto.get("/id/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const item = productos.find((item) => item.id === id);
  res.json(item);
});
/* ------------------------------ DELETE producto por id ----------------------------- */
routerProducto.delete('/:id', (req, res)=>{
  const id = req.params.id;
  //Borrar el usuario con el :id

  res.json({mensaje: "ok delete"})
});
/* ------------------------------ PUT producto ------------------------------ */
app.put('/api/:id', (req, res) => {
  const id = req.params.id;
  /* ----------------------- Objeto body de la petición ----------------------- */
  //req.body;

  //Modificar usuario :id
  res.json({mensaje: "ok put"});
});
app.use("/api/productos", routerProducto);

/* ------------------- Configuracion de archivos estaticos ------------------ */
app.use(express.static("public"));


const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server escuchando ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`))