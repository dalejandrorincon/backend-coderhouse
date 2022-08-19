import { Router } from 'express';
import Contenedor from '../utils/contenedor.js';
const router = Router();
const dbName = "dbProductos.json"
export const contenedorProductos = new Contenedor(dbName);
import { authLogin } from '../utils/authLogin.js';

/* ------------------------------ 2. GET producto ----------------------------- */
router.get('/:id', (req, res) => {
  //Listar producto por id
  const id = parseInt(req.params.id);
  const listaProductos = [];
  const product = contenedorProductos.getById(id);
  if (product) {
    console.log(product)
    listaProductos.push(product);
  }
  res.render('productos', { listaProductos });
});

/* ------------------------------ 3. POST producto ----------------------------- */
router.post('/', authLogin, (req, res) => {
  //Incorpora productos al listado
  const product = req.body;
  if (product.title && product.thumbnail && product.price && product.stock && product.sku && product.description) {
    const _product = {
      ...product,
      date: Date.now()
    }
    contenedorProductos.save(_product);
    res.redirect('/api/productos');
  } else {
    res.status(400).send('Debe contener productos');
  }
});
/* ------------------------------ 4. PUT producto ----------------------------- */
router.put('/:id', authLogin,(req, res) => {
  //Actualiza un producto por su id
  const id = parseInt(req.params.id); //1
  const listaProductos = contenedorProductos.getAll();
  const product = req.body;
  if (product.title && product.thumbnail && product.price && product.stock && product.sku && product.description) {
    contenedorProductos.deleteById(id);
    const _product = {
      ...product,
      date: Date.now()
    }
    contenedorProductos.save(_product);
    res.json(listaProductos);
  } else {
    res.status(400).send('Debe contener productos');
  }
    
  });
/* ------------------------------ 5. DELETE producto ----------------------------- */
router.delete('/:id', authLogin, (req, res) => {
  //Borra un producto por id
  const id = parseInt(req.params.id);
  contenedorProductos.deleteById(id);
  const listaProductos = contenedorProductos.getAll();
  res.json(listaProductos);
});

// module.exports = router; // COMMONJS
export default router; // ES6
