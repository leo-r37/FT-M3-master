var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

const nombres = [];
beatles.forEach(b => {
  nombres.push(
    b.name.split(' ').join('%20')
  )
})

http.createServer((req, res) => {

  switch (req.url) {
    case '/api':
      res.writeHead(200, { 'Content-Type' : 'application/json' })
      res.end( JSON.stringify(beatles) );
      break;
    case `/api/${nombres[0]}`:
      res.writeHead(200, { 'Content-Type' : 'application/json' })
      res.end( JSON.stringify(beatles[0]) );
      break;
    case `/api/${nombres[1]}`:
      res.writeHead(200, { 'Content-Type' : 'application/json' })
      res.end( JSON.stringify(beatles[1]) );
      break;
    case `/api/${nombres[2]}`:
      res.writeHead(200, { 'Content-Type' : 'application/json' })
      res.end( JSON.stringify(beatles[2]) );
      break;
    case `/api/${nombres[3]}`:
      res.writeHead(200, { 'Content-Type' : 'application/json' })
      res.end( JSON.stringify(beatles[3]) );
      break;
    case '/api/solonombres':
      res.writeHead(200, { 'Content-Type' : 'text/plain' })
      res.end( nombres.toString() );
      break;
  
    default:
      res.writeHead(200, { 'Content-Type' : 'text/plain' })
      res.end( "Los Beatles no estan :'(" );
      break;
  }




}).listen(1337, '127.0.0.1');
