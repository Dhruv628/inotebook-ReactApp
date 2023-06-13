const connectToMongo= require('./db');
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

//Step 1 :Render
const port=process.env.PORT || 5000;

app.use(express.json())

//Availaible routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

//Step 3: Render
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

app.listen(port,()=>{
console.log(`iNotebook backend started succesfully at ${port}`)
})

connectToMongo();

