const { Router } = require ('express');
const router = Router();

const { deleteById, getAllProducts, getById, saveProduct, updateById } = require ('../controllers/product.js');

/* ------------------------------- 1. GET ALL ------------------------------- */
router.get('/', getAllProducts)
/* ------------------------------ 2. GET producto ----------------------------- */
router.get('/:id', getById);
/* ------------------------------ 3. POST producto ----------------------------- */
router.post('/', saveProduct);
/* ------------------------------ 4. PUT producto ----------------------------- */
router.put('/:id', updateById);
/* ------------------------------ 5. DELETE producto ----------------------------- */
router.delete('/:id', deleteById);

module.exports = router; // COMMONJS
