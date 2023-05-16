const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const {generateAccessToken , generateRefreshToken} = require("../middlewares/jwt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../ultils/sendMail")
const crypto = require("crypto")

const register  = asyncHandler(async (req , res) => {
  const {email , password , firstname , lastname} = req.body
  if(!email || !password || !lastname || ! firstname)
  return res.status(400).json({
    sucess : false,
    mes : "Missing puts"
  })

  const user = await User.findOne({email})
  if(user)
          throw new Error("User has existed!")
  else{
    const newUser = await User.create(req.body)
    return res.status(200).json({
      sucess : newUser ? true : false ,
      mes : newUser ?  "Register is successfully . Please go login " : "Something went wrong"
    })
  }

})

const login  = asyncHandler(async (req , res) => {
  const {email , password } = req.body
  if(!email || !password)
  return res.status(400).json({
    sucess : false,
    mes : "Missing puts"
  })

  const  response = await User.findOne({email})
  if(response && await response.isCorrectPassword(password)){
    const {password , role , ...userData} = response.toObject()
    const accessToken = generateAccessToken(response._id , role)
    const refreshToken = generateRefreshToken(response._id)
    await User.findByIdAndUpdate(response._id , {refreshToken} , {new : true})
    res.cookie('refreshToken' , refreshToken , {httpOnly : true , maxAge : 7*24*60*60*1000})
      return res.status(200).json({
        sucess : true ,
        accessToken,
        userData
      })
  }
  else{
    throw new Error("Invalid credentials!")
  }

})

const getCurrent  = asyncHandler(async (req , res) => {
  const { _id} = req.user
  const user = await User.findById(_id).select('-refreshToken -password -role')
  return res.status(200).json({
    sucess : false ,
    rs : user ? user : "User not found"
  })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
  const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
  return res.status(200).json({
      success: response ? true : false,
      newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
  })
})

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if(!cookie || !cookie.refreshToken) throw new Error("No refresh token in cookie")
  await User.findOneAndUpdate({refreshToken : cookie.refreshToken} , {refreshToken : ""} , {new :true})
  res.clearCookie("refreshToken" , {
    httpOnly : true ,
    secure : true
  })
  return res.status(200).json({
    success : true ,
    mes : "Logout is done"
  })
})

const forgotPassword = asyncHandler(async (req , res) => {
    const {email} = req.query
    if(!email) throw new Error("Missing Email")
    const user = await User.findOne({email})
    if(!user) throw new Error("User not found")
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15p <a
    href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}
    >Click here</a>`

    const data = {
      email,
      html
    }

    const rs = await sendEmail(data)
    return res.status(200).json({
      success : true ,
      rs
    })

})

const resetPassword = asyncHandler(async (req, res) => {
  const {password , token} = req.body
  if(!password || !token) throw new Error("Missing inputs")
  const passwordResetToken = crypto.createHash("sha256").update(token).digest("hext")
  const user = await User.findOne({passwordResetToken , passwordResetExpires : {$gt : Date.now()}})
  if(!user) throw new Error("Invalid reset token")
  user.password = password
  user.passwordResetToken = undefined
  user.passwordChangedAt = Date.now()
  user.passwordResetExpires = undefined
  await user.save()
  return res.status(200).json({
    success : user ? true : false ,
    mes : user ? 'Update password' : "Something went wrong"
  })
})

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword
}