/*
    input
    악성 입력
    . & echo you are hacked :) > C:\Users\jeong\Desktop\hacked.txt

*/


const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const querystring = require('querystring');
const iconv = require('iconv-lite');


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'GET' && req.url === '/') {
        const htmlPath = path.join(__dirname, 'form78.html');
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('폼을 불러올 수 없습니다.');
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    }
    else if (req.method === 'POST' && req.url === '/exec') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const parsed = querystring.parse(body);
            const filename = decodeURIComponent(parsed.filename); 

            const command = `dir ${filename}`;

            exec(command, { encoding: 'buffer' }, (err, stdout, stderr) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end(iconv.decode(stderr, 'cp949'));
                }
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(iconv.decode(stdout, 'cp949'));
            });
        });
    }   
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('페이지를 찾을 수 없습니다.');
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
