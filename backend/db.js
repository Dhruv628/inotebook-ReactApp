const mongoose = require('mongoose')
const mongoURL =`mongodb+srv://sharmaaniket682:3ufroaG31zohLNDJ@cluster0.nkzorwo.mongodb.net/?retryWrites=true&w=majority`

async function connectToMongo() {
    mongoose.connect(mongoURL).then(
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
