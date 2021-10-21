//  Basic http server and req/res properties
const http = require('http');
const {readFileSync} = require('fs');
const homePage = readFileSync('./index.html');
const pageStyle = readFileSync('./style.css');

const server = http.createServer((req, res) => {
    // home page
    if(req.url === '/') {
        res.writeHead(200,{'content-type' : 'text/html'});
        res.write(homePage, 'utf8');
        res.end();
    }
    // about page
    if(req.url === '/style.css') {
        res.writeHead(200,{'content-type' : 'text/css'});
        res.write(pageStyle, 'utf8');
        res.end();
    }
    // 404
    else {
        res.writeHead(404,{'content-type' : 'text/html'});
        res.write('<h1>Page not found</h1>', 'utf8');
        res.end();
    }
});

server.listen(5000);