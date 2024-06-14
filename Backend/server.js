const { createServer } = require('http');
const url = require('url');
const fs = require('fs');
const handleSignup = require('./Routes/signup');
const handleLogin = require('./Routes/login');

const hostname = '127.0.0.1';
const port = '8080';

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // To Handle preflight request
        res.writeHead(204);
        res.end();
    } else if(req.method === 'POST' && req.url==='/signup') {
        handleSignup(req,res);
    } 
    else if(req.method === 'POST' && req.url==='/login'){
        handleLogin(req,res);
    } 
    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});