const { Router } = require("express");
/* --------------------- Llamado de la clase contenedor --------------------- */
const Contenedor = require("../utils/contenedor");
const dbName = "db.json";
const contenedor = new Contenedor(dbName);
const upload = require("../storage");
const routerProducto = new Router();
/* ------------------------------ GET productos ----------------------------- */
routerProducto.get("/", (req, res) => {
  const listaProductos = contenedor.getAll();
  res.json(listaProductos);
});
/* ------------------------------ POST producto ----------------------------- */
routerProducto.post("/", upload.single("thumbnail"), (req, res) => {
  const file = req.file;
  const producto = req.body;
  producto["thumbnail"] = file.path;
  contenedor.save(producto);
  res.json(producto)
});
/* --------------------------- GET producto por id -------------------------- */
routerProducto.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = contenedor.getById(id);
  res.json(producto);
});
/* ------------------------------ DELETE producto por id ----------------------------- */
routerProducto.delete('/:id', (req, res)=>{
  const id = parseInt(req.params.id);
  contenedor.deleteById(id);
  const listaProductos = contenedor.getAll();
  res.json(listaProductos);
});
/* ------------------------------ PUT producto ------------------------------ */
routerProducto.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = contenedor.getById(id);
  const nuevoValor = {...producto, "newPrice": 100000}
  contenedor.save(nuevoValor);
  const listaProductos = contenedor.getAll();
  res.json(listaProductos);
});

module.exports = routerProducto;