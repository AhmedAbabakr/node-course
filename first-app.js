// const fs = require('fs');
// fs.writeFileSync("hello.txt","Hello World!");

const http = require("http");
const fs = require("fs");

function rqListener(message,response)
{
    console.log(message);
    console.log("Tes");
    // process.exit();
}

const server = http.createServer((request,response) => {
   const url = request.url;
   const method = request.method;
   if(url === "/")
   {
        response.write("<html>");
        response.write("<head><title>Enter Message</title></head>");
        response.write("<body>");
        response.write("<form action='/message' method='post'>");
        response.write("<input type='text' name='message' placeholder='Message'>");
        response.write("<button>Submit</button>");
        response.write("</form>");
        response.write("</body>");
        response.write("</html>");
        return response.end();
   }
   if(url === '/message' && method === 'POST')
   {
        const body =[];
        request.on('data',(chunk)=>{
            
            body.push(chunk);
        });
        return request.on('end',()=>{
            const parsedBody =Buffer.concat(body).toString();
            message_value = parsedBody.split('=')[1];
            // console.log(message_value[1]);
            fs.writeFile('message.txt',message_value ,err =>{
                response.statusCode = 302;
                response.setHeader('Location','/');
                return response.end();
            });
              
        });
       
        
   }
   response.setHeader('Content-Type','text/html');
   
});

server.listen(3000);