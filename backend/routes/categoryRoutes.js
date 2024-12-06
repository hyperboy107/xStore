import express from "express";
const router = express.Router()
import { createCategory, updateCategory, deleteCategory, categoriesList, readCategory } from "../controllers/categoryController.js";

import {authhenticate, authorizedAdmin} from '../middlewares/authMiddleware.js'

router.route("/").post(authhenticate,authorizedAdmin,createCategory);
router.route('/:categoryId').put(authhenticate, authorizedAdmin, updateCategory)
router.route('/:categoryId').delete(authhenticate, authorizedAdmin, deleteCategory)
router.route('/categories').get(authhenticate, categoriesList)
router.route('/:id').get(readCategory)

export default router;