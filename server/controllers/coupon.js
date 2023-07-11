const Coupon = require("../models/coupon")
const asyncHandler = require("express-async-handler")

const createNewCoupon = asyncHandler( async (req , res) => {
  const {name , discount , expiry} = req.body
  if(!name || !discount || !expiry) throw new Error("Missing inputs")
  const response = await Coupon.create({
    ...req.body ,
    expiry : Date.now() + +expiry *24*60*60*1000
  })
  return res.json({
    status : response ? true : false ,
    createCoupon : response ? response : "Cannot create new Coupon"
  })
})

const getCoupon = asyncHandler( async (req , res) => {
  const response = await Coupon.find().select('-createdAt -updatedAt' )
  return res.json({
    status : response ? true : false ,
    Coupon : response ? response : "Cannot get Coupon"
  })
})

const updateCoupon = asyncHandler( async (req , res) => {
  const {cid} = req.params
  if(Object.keys(req.body).length === 0) throw Error("Missing input")
  if(req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry *24*60*60*1000
  const response = await Coupon.findByIdAndUpdate(cid , req.body , {new : true})
  return res.json({
    status : response ? true : false ,
    updatedCoupon : response ? response : "Cannot update Coupon"
  })
})

const deleteCoupon = asyncHandler( async (req , res) => {
  const {cid} = req.params
  const response = await Coupon.findByIdAndDelete(cid)
  return res.json({
    status : response ? true : false ,
    deleteCoupon : response ? response : "Cannot delete Coupon"
  })
})

module.exports = {
  createNewCoupon ,
  getCoupon ,
  updateCoupon ,
  deleteCoupon
}