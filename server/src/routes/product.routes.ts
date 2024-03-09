// Required Package Import
import express from "express";
const route = express.Router();
import productController  from "../controller/product.controller";

route.get('/getProductCategory', productController.getProductCategory);

route.get('/getProductCategoryWise', productController.getProductCategoryWise);

route.get('/getProductById', productController.getProductById);

route.post('/placeOrder', productController.placeOrder);

route.get('/getOrderList', productController.getOrderList);

export default route;
