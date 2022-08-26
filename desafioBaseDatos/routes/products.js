const { Router } = require('express');
const Contenedor = require('../utils/contenedor');
const router = Router();
const contenedorProductos = new Contenedor('../knexfile-products','productos');

router.get('/', async (req, res) => {
  const _respuesta = await contenedorProductos.getAll();
  res.send(_respuesta);
});
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const _respuesta = await contenedorProductos.getById(id);
  res.send(_respuesta);
});

router.post('/', async (req, res) => {
  const { nombre, precio, foto } = req.body;
  if(nombre && precio && foto){
    const _product = {
      nombre, 
      precio,
      foto
    }
    const _respuesta = await contenedorProductos.save(_product)
    res.send(_respuesta);
  }else{
    res.status(400).send('Debe contener productos');
  }
});
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const _respuesta = await contenedorProductos.deleteById(id);
  res.send(_respuesta);
});

module.exports = router;

// router.put('/:id', async (req, res) => {
//   const body = req.body;
//   const id = req.params.id;

//   if (body.nombre && body.foto && body.precio) {
//     const _newProduct = {
//       nombre: body.nombre,
//       foto: body.foto,
//       precio: body.precio
//     }
//     try {
//       const _result = await database(tableName)
//         .where({id: id})
//         .update(_newProduct)
//       res.send({_newProduct, id: _result[0]});
//     } catch (err) {
//       res.send(err)
//     }
//   }
// });


