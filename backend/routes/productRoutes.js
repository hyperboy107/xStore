import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { addProduct, updateProduct, deleteProduct, fetchProduct, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from "../controllers/productController.js";

import {authhenticate, authorizedAdmin} from '../middlewares/authMiddleware.js'
import checkID from '../middlewares/checkID.js'

router.route('/').get(fetchProduct).post(authhenticate, authorizedAdmin, formidable(), addProduct);
router.route('/allproducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authhenticate,checkID, addProductReview)
router.get('/top', fetchTopProducts)
router.get('/new', fetchNewProducts)
router.route('/:id').get(fetchProductById).put(authhenticate, authorizedAdmin, formidable(), updateProduct).delete(authhenticate, authorizedAdmin, formidable(), deleteProduct)
router.route('/filtered-products').post(filterProducts)
export default router;