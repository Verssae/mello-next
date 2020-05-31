const next = require('next');
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

const httpPort = 8080;
const httpsPort = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();  


const options = { 
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt'), 
};
// https.globalAgent.options.ca = require('ssl-root-cas/latest').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

app.prepare().then(() => {           
  server.all('*', (req, res) => {
    return handle(req, res)    
  });
  http.createServer(server).listen(httpPort);
  https.createServer(options, server).listen(httpsPort);
});

