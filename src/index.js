const http = require('http');

const server = http.createServer((request, response) => {
   response.writeHead(200, { 'Content-Type': 'application/json' });
   response.end('<h1> Hello World!</h1>');
});

server.listen(3500, () => {
   console.log(`Server started at: http://localhost:3500`);
});