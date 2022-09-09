const { Product } = require('../schemas/productsSchema');
const { Types } = require("mongoose");
const PAGE_SIZE = 2;

async function getAllProducts(req, res) {
  const page = Number(req.query.page || 1);
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).send(err);
  }
}
async function getById(req, res) {
  let id = req.params.id;
  id = Types.ObjectId(id) // Conversion Tipo ObjectId
  try {
    const product = await Product.findOne({ _id: id });
    res.json(product);
  } catch (err) {
    res.status(400).send(err);
  }
}
async function saveProduct(req, res) {
  const body = req.body;
  try {
    const product = await Product.insertOne(body);
    res.json(product);
  } catch (err) {
    res.status(400).send(err);
  }
}
async function updateById(req, res) {
  let id = req.params.id;
  const body = req.body;
  id = Types.ObjectId(id) // Conversion Tipo ObjectId
  try {
    const product = await Product.updateOne({ _id: id }, body);
    res.json(product);
  } catch (err) {
    res.status(400).send(err);
  }
}
async function deleteById(req, res) {
  let id = req.params.id;
  id = Types.ObjectId(id) // Conversion Tipo ObjectId
  try {
    await Product.deleteOne({ _id: id });
    res.json('Producto eliminado');
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  getAllProducts,
  getById,
  saveProduct,
  updateById,
  deleteById
}


