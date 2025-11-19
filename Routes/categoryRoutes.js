const express=require('express');
// const app = express();
const router = express.Router();
const {createcategory,getCategory,getById}= require('../controller/categoryController');
const auth = require('../middleware/authMiddleware');

router.post('/category',auth,createcategory);
router.get('/category',getCategory);
router.get('/:id',getById);
module.exports=router;