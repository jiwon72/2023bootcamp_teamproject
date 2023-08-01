// Import required modules
const express = require('express');
//HTTP 응답을 받기 위한 모듈
const bodyParser = require('body-parser');
// server log를 위한 모듈
const morgan = require('morgan');


// Create the Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define your routes and APIs here
// Mount the login router
const loginRouter = require('./routes/login');
app.use('/api/login', loginRouter);

app.get('/',(req,res)=>{
    res.send("hello express");
})
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});