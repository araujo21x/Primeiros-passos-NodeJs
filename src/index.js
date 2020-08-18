const http = require('http');
const url = require('url');
const routes = require('./routes');
const bodyParser = require('./helper/BodyParse');

const server = http.createServer((request, response) => {

   response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
   }
   const parseUrl = url.parse(request.url, true);
   let { pathname } = parseUrl;
   let id = null
   const splintEndpoint = pathname.split('/').filter(Boolean);

   if (splintEndpoint.length > 1) {
      pathname = `/${splintEndpoint[0]}/:id`;
      id = splintEndpoint[1];
   }

   const route = routes.find((routeObj) => (
      routeObj.endpoint === pathname && routeObj.method === request.method
   ));

   if (route) {
      request.query = parseUrl.query;
      request.params = { id };

      if (['POST' , 'PUT', 'PATCH'].includes(request.method))
         bodyParser(request, () => { route.handler(request, response) });
      else
         route.handler(request, response)


   } else {
      response.send(404, { message: `Cannot ${request.method} ${request.pathname}` })
   }
});

server.listen(3500, () => {
   console.log(`Server started at: http://localhost:3500`);
});