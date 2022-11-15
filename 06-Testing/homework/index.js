const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'hola'
  })
});

app.post('/sum', (req, res) => {
  const { a, b } = req.body;
  let result = a + b;
  res.send({
    result
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  res.send({
    result: true
  })
});

app.post('/numString', (req, res) => {
  const { string } = req.body;
  if (typeof string === 'number' || !string) res.send(400);
  else {
    res.send({
      result: req.body.string.length
    })
  }
});

app.post('/pluck', (req, res) => { 
  const { array, prop } = req.body;

  if (!Array.isArray(array) || !prop) res.send(400);
  else {
    const values = array.map(obj => obj[prop]);
    res.send({result: values});
  }
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
