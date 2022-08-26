const { Router } = require('express');
const Contenedor = require('../utils/contenedor');
const router = Router();
//const contenedorProductos = new Contenedor('./dbProductos.json');
const knex = require('knex');
const knexConfig = require('../knexfile');
const database = knex(knexConfig);
const tableName = 'productos';

router.get('/', async (req, res) => {
  //res.send(contenedorProductos.getAll());
  try {
    const productos = await database(tableName).select();
    res.send(productos);
} catch (err) {
    res.send(err);
}
});
router.get('/:id', async (req, res) => {
  //res.send(contenedorProductos.getAll());
  try {
    const id = req.params.id;
    const _producto = await database(tableName)
    .select()
    .where('id', id);
    res.send(_producto);
} catch (err) {
    res.send(err);
}
});

router.post('/', async (req, res) => {
  const { nombre, precio, foto } = req.body;
  if(nombre && precio && foto){
    const _product = {
      nombre, 
      precio,
      foto
    }
    const _result = await database(tableName).insert(_product);
    res.send({..._product, id: _result[0]});
    //res.redirect('/');
  }else{
    res.status(400).send('Debe contener productos');
  }
});

router.put('/:id', async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (body.nombre && body.foto && body.precio) {
    const _newProduct = {
      nombre: body.nombre,
      foto: body.foto,
      precio: body.precio
    }
    try {
      const _result = await database(tableName)
        .where({id: id})
        .update(_newProduct)
      res.send({_newProduct, id: _result[0]});
    } catch (err) {
      res.send(err)
    }
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await database(tableName)
    .where({id: id})
    .del()
    res.send('Producto eliminado');
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
