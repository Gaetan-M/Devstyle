const express= require('express');
const router=express.Router();
const Product= require('../controllers/product_controller.js')
const upload=require('../middlewares/upload.js')

router.post('/product/create',upload.array("products"), Product.createProduct)
router.get('/products', Product.getAllProduct)
router.get('/product/:id', Product.getOneProduct)
router.put('/product/update/:id', Product.updateOneProduct)
router.put('/product/image/update/:id',upload.array("products"), Product.updateProductImage)
router.delete('/product/delete', Product.deleteProduct)
router.get('/products/category', Product.getProductCategory)
router.get('/products/new', Product.getNewProduct)
router.get('/products/hot', Product.getHotProduct)
router.put('/product/views/:id',Product.updateViews)
router.put('/product/likes/:id',Product.updateLikes)


module.exports = router;