/*
    input
    2 + 2 -> 4

    'hello'.toUpperCase() -> HELLO

    require('fs').readdirSync('.') -> 현재 디렉토리 목록 출력

    while(true){} -> 서버 무한 루프 (DoS 실습)

    global.process.exit() -> 서버 강제 종료
*/


const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');


    if (req.method === 'GET' && req.url === '/') {
        const htmlPath = path.join(__dirname, 'form94.html');
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('폼을 불러올 수 없습니다.');
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    }


    else if (req.method === 'POST' && req.url === '/run') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const parsed = querystring.parse(body);
            const code = parsed.code;

            try {
                const result = eval(code);  
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`결과: ${result}`);
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`에러: ${e.message}`);
            }
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
