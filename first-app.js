// const fs = require('fs');
// fs.writeFileSync("hello.txt","Hello World!");

const http = require("http");
const express = require("express");
const app = express();

app.use((request,response,next) => {
    console.log("Middleware");
    next();
});
app.use((request,response,next) => {
    console.log("Another Middleware");
});
// const routes = require("./routes");
function rqListener(message,response)
{
    console.log(message);
    console.log("Tes");
    // process.exit();
}

// const server = http.createServer(routes);
const server = http.createServer(app);

server.listen(3000);