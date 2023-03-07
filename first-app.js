// const fs = require('fs');
// fs.writeFileSync("hello.txt","Hello World!");

const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const routes =require('./routes');
const { response } = require("express");

app.use(express.urlencoded({extended:false}));
app.use(routes); 
app.use((request,response,next) => {
    response.status(404).sendFile(path.join(__dirname,'views/pages','404.html'));
  
});

// app.use(bodyParser.urlencoded({extended:false}));




// const server = http.createServer(routes);
const server = http.createServer(app);

server.listen(3000);