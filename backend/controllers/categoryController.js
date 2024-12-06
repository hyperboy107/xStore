import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const {name} = req.body;
        // console.log(name)
        if(!name){
            return res.json({error: "Name is required"})
        }

        const existCategory = await Category.findOne({name})
        if(existCategory){
            return res.json({error: "Name is exist"})
        }

        const category = await new Category({name}).save();
        res.json(category)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const {name} = req.body;
        const {categoryId} = req.params

        const category = await Category.findOne({_id: categoryId})
        if(!category) return res.status(404).json({error: "Category not found"})

        category.name = name;
        const updatedCategory = await category.save()
        res.json(updatedCategory)
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const removeCate = await Category.findByIdAndDelete(req.params.categoryId)
        res.json(removeCate)
    } catch (error) {
        res.status(404).json({error: "something went wrong"})
    }
})

const categoriesList = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({})
        res.json(all)
    } catch (error) {
        res.status(404).json({error: "something went wrong"})
    }
})

const readCategory = asyncHandler (async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id})
        res.json(category)
    } catch (error) {
        res.status(404).json({error: "Not found"})
    }
})

export {createCategory, updateCategory, deleteCategory, categoriesList, readCategory}