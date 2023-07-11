const Brand = require("../models/brand")
const asyncHandler = require("express-async-handler")

const createNewBrand = asyncHandler( async (req , res) => {
  const response = await Brand.create(req.body)
  return res.json({
    status : response ? true : false ,
    createdBrand : response ? response : "Cannot create new Brand"
  })
})

const getBrands = asyncHandler( async (req , res) => {
  const response = await Brand.find()
  return res.json({
    status : response ? true : false ,
    brands : response ? response : "Cannot get Brand"
  })
})

const updateBrand = asyncHandler( async (req , res) => {
  const {bid} = req.params
  const response = await Brand.findByIdAndUpdate(bid , req.body , {new : true})
  return res.json({
    status : response ? true : false ,
    updatedBrand : response ? response : "Cannot update Brand"
  })
})

const deleteBrand = asyncHandler( async (req , res) => {
  const {bid} = req.params
  const response = await Brand.findByIdAndDelete(bid)
  return res.json({
    status : response ? true : false ,
    deleteBrand : response ? response : "Cannot delete Brand"
  })
})

module.exports = {
  createNewBrand ,
  getBrands ,
  updateBrand ,
  deleteBrand
}