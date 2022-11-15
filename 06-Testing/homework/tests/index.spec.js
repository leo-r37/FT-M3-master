const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe("POST /producto", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
  });

  describe('POST /numString', () => {
    it('should reply the POST method with status code 200', async () => {
       const res = await agent.post('/numString').send({string: 'mensaje'});
       expect(res.statusCode).toBe(200);
    });
    it('should reply the length of the string sended', async () => {
      const res = await agent.post('/numString').send({string: 'hola'});
      expect(res.body.result).toBe(4);
      const res2 = await agent.post('/numString').send({string: 'stringmaslargo'});
      expect(res2.body.result).toBe(14);   
    });
    it('should reply with 400 if string is a number', async () => {
      const res = await agent.post('/numString').send({string: 135});
      expect(res.statusCode).toBe(400);
    });
    it('should reply with 400 if dont send anything', async () => {
      const res = await agent.post('/numString');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /pluck', () => {

    const arr1 = [
      {
        name: 'ale',
        age: 31
      },
      {
        name: 'leo',
        age: 29
      },
      {
        name: 'abi',
        age: 27
      },
      {
        name: 'rodri',
        age: 26
      },
    ];

    const prop1 = 'name';

    const arr2 = [
      {
        car: 'ford',
        model: 'focus'
      },
      {
        car: 'citroen',
        model: 'c4'
      },
      {
        car: 'chevrolet',
        model: 'cruce'
      },
      {
        car: 'fiat',
        model: 'chronos'
      },
    ];

    const prop2 = 'model';

    it('should reply the POST method with status code 200', async () => {
      const res = await agent.post('/pluck').send({array: arr1, prop: prop1});
      expect(res.statusCode).toBe(200);
    });
    it('should reply with the value of the properties on each object', async () => {
      const res = await agent.post('/pluck').send({array: arr1, prop: prop1});
      expect(res.body.result).toEqual(['ale', 'leo', 'abi', 'rodri']);
      const res2 = await agent.post('/pluck').send({array: arr2, prop: prop2});
      expect(res2.body.result).toEqual(['focus', 'c4', 'cruce', 'chronos']);
    });
    it('should reply with 400 if array is not an array', async () => {
      const res = await agent.post('/pluck').send({array: 'string'});
      expect(res.statusCode).toBe(400);
    });
    it('should reply with 400 if prop is empty', async () => {
      const res = await agent.post('/pluck').send({array: arr1});
      expect(res.statusCode).toBe(400);
    })
  });
});
