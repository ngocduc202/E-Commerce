const Coupon = require("../models/coupon")
const Order = require("../models/order")
const User = require("../models/user")
const asyncHandler = require("express-async-handler")

const createOrder = asyncHandler( async (req , res) => {
  const { _id} =  req.user
  const {products , total} = req.body

  const rs = await Order.create({products , total , postedBy: _id})
  return res.json({
    status : rs ? true : false ,
    rs : rs ? rs : "Something went wrong"
  })
})

const updateStatus = asyncHandler( async (req , res) => {
  const { oid} = req.params
  const {status} = req.body
  if(!status) throw new Error("Missing inputs")
  const response = await Order.findByIdAndUpdate(oid , {status} , {new : true})

  return res.json({
    status : response ? true : false ,
    response : response ? response : "Something went wrong"
  })
})

const getUserOrder = asyncHandler( async (req , res) => {
  const { _id} = req.user
  const response = await Order.find({orderBy : _id})

  return res.json({
    status : response ? true : false ,
    response : response ? response : "Something went wrong"
  })
})

const getOrders = asyncHandler( async (req , res) => {
  const { _id} = req.user
  const response = await Order.find()

  return res.json({
    status : response ? true : false ,
    response : response ? response : "Something went wrong"
  })
})

module.exports = {
  createOrder ,
  updateStatus ,
  getUserOrder ,
  getOrders
}