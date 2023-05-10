const userRouter  = require("./user")

const initRouters  = (app) => {
  app.use('/api/user' , userRouter)
}


module.exports = initRouters