const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  thumbnail: {type: String, required: true},
  stock: {type: String, required: true}
});

const Producto = model('producto', productSchema);

module.exports = {
  productSchema,
  Producto
}