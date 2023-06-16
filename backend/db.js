const mongoose = require('mongoose')
const mongoURL ="mongodb+srv://sharmaaniketpubg:2eaBL274BwmecrZE@cluster0.zeewoam.mongodb.net/"
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
