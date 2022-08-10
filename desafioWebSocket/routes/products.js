const { Router } = require('express');
const Contenedor = require('../utils/contenedor');
const router = Router();
const contenedorProductos = new Contenedor('./dbProductos.json');

router.get('/', (req, res) => {
  res.send(contenedorProductos.getAll());
});

router.post('/', (req, res) => {
  const { nombre, precio, foto } = req.body;
  if(nombre && precio && foto){
    contenedorProductos.save({
      nombre,
      precio,
      foto
    });
    res.redirect('/');
  }else{
    res.status(400).send('Debe contener productos');
  }
});

module.exports = router;
