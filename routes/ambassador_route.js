const Ambassador =require('../controllers/ambassador_controller.js')
const upload = require('../middlewares/upload.js')
const express= require('express')
const router=express.Router()


router.post('/ambassador/create',upload.array("ambassador"),Ambassador.createAmbassador)
router.get('/ambassadors/all',Ambassador.getAllAmbassadors)
router.get('/ambassador/:id',Ambassador.getOneAmbassadors)
router.delete('/ambassador/delete/:id',Ambassador.deleteOneAmbassadors)
router.put('/ambassador/update/:id',Ambassador.updateOneAmbassadors)
router.put('/ambassador/image/update/:id',upload.array("ambassador"),Ambassador.updateAmbassadorImage)

module.exports=router