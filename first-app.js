// const fs = require('fs');
// fs.writeFileSync("hello.txt","Hello World!");

const http = require("http");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(express.urlencoded({extended:false}));
// app.use(bodyParser.urlencoded({extended:false}));

app.use('/add-product',(request,response,next) => {
    response.send("<form action='/product' method='POST'><input name='3awady' type='text' placeholder='Insert Name'><button type='submit'>Submit</button></form>");
    // response.send("<form action='/product' method='POST'><input name='3awady' type='text' placeholder='Insert Name'><button type='submit'>Submit</button></form>");

});
app.use('/product',(request,response,next) => {
    console.log(request.body);
    response.redirect('/');
});

app.use('/',(request,response,next) => {
    response.send("<h1>Welcome Home</h1>");

});
// const server = http.createServer(routes);
const server = http.createServer(app);

server.listen(3000);