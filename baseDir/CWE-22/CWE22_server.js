/*
    input
    정상 입력
    README.txt

    악성 입력
    ../passwd.txt


*/


const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'GET' && req.url === '/') {
        const formPath = path.join(__dirname, 'form22.html');
        fs.readFile(formPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('폼 파일을 불러올 수 없습니다.');
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    }
    else if (req.method === 'POST' && req.url === '/readFile') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsed = querystring.parse(body);
            const fileName = decodeURIComponent(parsed.filename);
            const filePath = path.join(__dirname, '/', fileName);

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    return res.end(`<h3>파일을 찾을 수 없습니다.</h3><p>${err.message}</p>`);
                }

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <h2>파일 내용:</h2>
                    <pre style="background:#f0f0f0;padding:10px;border:1px solid #ccc;">
                        ${data.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                    </pre>
                    <a href="/">돌아가기</a>
                `);
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
