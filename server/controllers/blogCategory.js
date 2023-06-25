const BlogCategory = require("../models/blogCategory")
const asyncHandler = require("express-async-handler")

const createCategory = asyncHandler( async (req , res) => {
  const response = await BlogCategory.create(req.body)
  return res.json({
    status : response ? true : false ,
    createCategory : response ? response : "Cannot create new BlogCategory"
  })
})

const getCategories = asyncHandler( async (req , res) => {
  const response = await BlogCategory.find().select("title _id")
  return res.json({
    status : response ? true : false ,
    blogCategories : response ? response : "Cannot get BlogCategory"
  })
})

const updateCategory = asyncHandler( async (req , res) => {
  const {bcid} = req.params
  const response = await BlogCategory.findByIdAndUpdate(bcid , req.body , {new : true})
  return res.json({
    status : response ? true : false ,
    updateCategory : response ? response : "Cannot update BlogCategory"
  })
})

const deleteCategory = asyncHandler( async (req , res) => {
  const {bcid} = req.params
  const response = await BlogCategory.findByIdAndDelete(bcid)
  return res.json({
    status : response ? true : false ,
    deleteCategory : response ? response : "Cannot delete BlogCategory"
  })
})

module.exports = {
  createCategory,
  getCategories ,
  updateCategory ,
  deleteCategory
}