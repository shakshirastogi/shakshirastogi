const express = require('express')
const  cors = require('cors');
const mongoose = require ('mongoose');
const {MONGO_URL} = require('./keyes');
 require('jsonwebtoken');



 require('./models/signup');
 require('joi');
const app = express()
const port = 1500;
//------------------------Middelwere------------------------------
app.use(express.json() );
app.options('*', cors()) 
app.use(require('./Routes/auth'))
//-------------------*--------------------*-----------------------      
//----------------DATABASE-CONNECTIVITY----------------//
mongoose.connect(MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
})
mongoose.connection.on('connected',()=>{
  console.log('connected'); 
})
  mongoose.connection.on('error', ()=>{
    console.log('not connected');
  } );
//-------------------------------
//-----------------------CORS-------------------------------------
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//----------------------------------------------------------------


app.listen(port, () => {
  console.log(`server app listening at ${port}`)
})
