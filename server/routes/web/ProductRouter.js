var express = require('express');
const ProductController = require('../../controllers/web/ProductController');


var ProductRouter = express.Router();


ProductRouter.get('/webapi/product/list', ProductController.getList)
// NewsRouter.get('/webapi/news/list/:id', NewsController.getList)
// NewsRouter.get('/webapi/news/toplist', NewsController.topList)

module.exports = ProductRouter;