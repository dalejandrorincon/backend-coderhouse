
import { Router } from 'express';
import Contenedor from '../utils/contenedor.js';
const router = Router();
const dbCart = "dbCart.json";
const dbProducts = "dbProductos.json";
const contenedorCarrito = new Contenedor(dbCart);
const contenedorProductos = new Contenedor(dbProducts);

const carrito = [];

/* ------------------------------ 1. GET carrito ----------------------------- */
router.get('/:id/productos', (req, res) => {
  //Listar productos guardados en el carrito
  const listaCarrito = contenedorCarrito.getAll();
  res.send(listaCarrito);
});
/* ------------------------------ 2. POST carrito ----------------------------- */
router.post('/', (req, res) => {
  //Crea carrito y devuelve id
  const _carrito = {
    ...carrito,
    date: Date.now()
  }
  contenedorCarrito.save(_carrito);
  res.json(_carrito);
});
/* ------------------------------ 3. POST productos al carrito ----------------------------- */
router.post('/:id/productos/:idProd', (req, res) => {
  //Incorpora productos al carrito por id de producto
  const id = parseInt(req.params.id);
  const idProd = parseInt(req.params.idProd);
  const product = contenedorProductos.getById(idProd);
  carrito.push({product});
  const cart = contenedorCarrito.getById(id);
  const _carrito = {
    ...cart,
    ...carrito,
    date: Date.now()
  }
  contenedorCarrito.save(_carrito);
  const listadoCarritos = contenedorCarrito.getAll();
  res.json(_carrito);
});
/* ------------------------------ 4. DELETE carrito ----------------------------- */
router.delete('/:id', (req, res) => {
  //Vacia un carrito y lo elimina
  const id = parseInt(req.params.id);
  contenedorCarrito.deleteById(id);
  const _carrito = contenedorCarrito.getAll();
  res.json(_carrito);
});
/* ------------------------------ 5. DELETE producto en carrito ----------------------------- */
router.delete('/:id/productos/:id_prod', (req, res) => {
  //Elimina un producto del carrito por su id del carrito y de producto
});

//module.exports = router;//COMMON JS
export default router;