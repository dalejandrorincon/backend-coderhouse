const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  thumbnail: {type: String, required: true},
  stock: {type: Number, required: true}
}, {timestamps: true}); //TimeStamps: createdAt, updatedAt

const Product = model('item', productSchema);

module.exports = {
  productSchema,
  Product
}