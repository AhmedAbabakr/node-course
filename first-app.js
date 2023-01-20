// const fs = require('fs');
// fs.writeFileSync("hello.txt","Hello World!");

const http = require("http");

const routes = require("./routes");
function rqListener(message,response)
{
    console.log(message);
    console.log("Tes");
    // process.exit();
}

const server = http.createServer(routes);

server.listen(3000);