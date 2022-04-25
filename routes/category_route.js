const express= require('express')
const router=express.Router()
const Category= require('../controllers/category_controller.js')
const upload=require('../middlewares/upload.js')

router.post('/category/create',upload.array("category"), Category.createCategory)
router.get('/category', Category.getAllCategory)
router.get('/category/one/:id', Category.getOneCategory)
router.put('/category/update/:id', Category.updateOneCategory)
router.delete('/category/delete/:id', Category.deleteCategory)
router.put('/category/image/update/:id',upload.array("category"), Category.updateCategoryImage)

module.exports = router;