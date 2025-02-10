const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const User = require('./schema.js');
const env = require('dotenv').config();
const connectDB = require('./db.js');



const app = express();


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const port = 3100;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.post('/add', async (req, res) => {
  try{
    const usedData = req.body;
    const newUser = new User(usedData);
    await newUser.save();
    res.status(200).json('User added successfully');

  }catch(error){
    if(error =='ValidationError'){
      res.status(400).json({ message: 'Validation error', details: error.message });
  }
  else{
    res.status(500).json({ message: 'Server error', details: error.message });
  }
  }
});
