const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;
const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  Web: String,
  language: String,
  Email: String,
  Message: String
});
//app.use(express.urlencoded())
const Contact = mongoose.model('Contact', ContactSchema);
app.get('/', (req, res) => {
  res.sendFile('index.html', {
      root: path.join(__dirname, './')
  })
})
app.post('/contact',(req,res) =>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("this item is saved")
  }).catch(()=>{
    res.status(404).send("your item was not saved")
  })
})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});