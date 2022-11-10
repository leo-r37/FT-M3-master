var fs  = require("fs")
var http  = require("http")

const arcoiris = fs.readFileSync('./images/arcoiris_doge.jpg')
const badboy = fs.readFileSync('./images/badboy_doge.jpg')
const code = fs.readFileSync('./images/code_doge.jpg')
const resaca = fs.readFileSync('./images/resaca_doge.jpg')
const retrato = fs.readFileSync('./images/retrato_doge.jpg')
const sexy = fs.readFileSync('./images/sexy_doge.jpg')

// Escribí acá tu servidor
http.createServer((req, res) => {

    switch (req.url) {
        case '/arcoiris':
            res.writeHead(200, { 'Content-Type' : 'image/jpg'})
            res.end(arcoiris)
            break;
        case '/badboy':
            res.writeHead(200, { 'Content-Type' : 'image/jpg'})
            res.end(badboy)
            break;
        case '/code':
            res.writeHead(200, { 'Content-Type' : 'image/jpg'})
            res.end(code)
            break;
        case '/resaca':
            res.writeHead(200, { 'Content-Type' : 'image/jpg'})
            res.end(resaca)
            break;
        case '/retrato':
            res.writeHead(200, { 'Content-Type' : 'image/jpg'})
            res.end(retrato)
            break;
        case '/sexy':
            res.writeHead(200, { 'Content-Type' : 'image/jpg'})
            res.end(sexy)
            break;
    
        default:
            res.writeHead(200, { 'Content-Type' : 'text/plain'})
            res.end('No se encuentra la imagen')
            break;
    }

}).listen(1337, '127.0.0.1');