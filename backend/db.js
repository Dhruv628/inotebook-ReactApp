const mongoose = require('mongoose')
const mongoURL = process.env.MY_MONGO_URI
async function connectToMongo() {
    mongoose.connect(`${mongoURL}`).then(
        (data)=>{
            console.log(`Mongodb connected successfully `)
        }
    ).catch(
        (err)=>{
            console.log(err)

        }
    )
  }
module.exports=connectToMongo;