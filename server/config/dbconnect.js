const {default :  mongoose} = require("mongoose")
mongoose.set('strictQuery', true);
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if(conn.connection.readyState == 1) console.log("DB connection is successfully");
    else console.log("connecting");
  } catch (error) {
    console.log("DB connection is false");
    throw new Error(error)
  }
}

module.exports = dbConnect