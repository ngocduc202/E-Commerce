const ProductCategory = require("../models/productCategory")
const asyncHandler = require("express-async-handler")

const createCategory = asyncHandler( async (req , res) => {
  const response = await ProductCategory.create(req.body)
  return res.json({
    status : response ? true : false ,
    createCategory : response ? response : "Cannot create new productCategory"
  })
})

const getCategories = asyncHandler( async (req , res) => {
  const response = await ProductCategory.find().select("title _id")
  return res.json({
    status : response ? true : false ,
    productCategories : response ? response : "Cannot get productCategory"
  })
})

const updateCategory = asyncHandler( async (req , res) => {
  const {pcid} = req.params
  const response = await ProductCategory.findByIdAndUpdate(pcid , req.body , {new : true})
  return res.json({
    status : response ? true : false ,
    updateCategory : response ? response : "Cannot update productCategory"
  })
})

const deleteCategory = asyncHandler( async (req , res) => {
  const {pcid} = req.params
  const response = await ProductCategory.findByIdAndDelete(pcid)
  return res.json({
    status : response ? true : false ,
    deleteCategory : response ? response : "Cannot delete productCategory"
  })
})

module.exports = {
  createCategory,
  getCategories ,
  updateCategory ,
  deleteCategory
}