const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/Forex';
const dbName = 'Forex';
const url = 'http://localhost:3001';

describe('Create an endpoint for create a new trade', () => {
  let db, connection;

  // before all tests will have a connection to a test DB
  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(dbName);
  });

  // after all tests will disconnect from the db and delete the test user
  afterAll(async () => {
    await db.collection('users').deleteMany({ name: 'PersonName LastName' });
    await connection.close();
  });

  it('should be able to create a new trade', async () => {
    let resultUser;

    await frisby
      .post(`${url}/users/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 201);

    await frisby
      .post(`${url}/login/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        resultUser = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: resultUser.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/trades`, {
            high: 1.4,
            low: 1.3,
            datetime: '2021-05-20 10:09:00',
            userId: resultUser.id,
            quantity: 12000,
            type: 'sell',
          })
          .expect('status', 201)
          .then((responseTrade) => {
            const { body } = responseTrade;
            resultTrade = JSON.parse(body);
            expect(resultTrade.trade.status).toBe('open');
            expect(resultTrade.trade.userId).toBe(resultUser.id);
            expect(resultTrade.trade.type).toBe('sell');
            expect(resultTrade.message).toBe('Trade successfully placed!');
          });
      });
  });
  it('should not be able to create a trade with invalid entries', async () => {
    let resultUser;

    await frisby
      .post(`${url}/login/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        resultUser = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: resultUser.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/trades`, {})
          .expect('status', 400)
          .then((responseTrade) => {
            const { body } = responseTrade;
            resultTrade = JSON.parse(body);
            expect(resultTrade.message).toBe('No entry can be undefined');
          });
      });
  });
});

describe('Create an endpoint for get all trades by the UserID', () => {
  let db, connection;

  // before all tests will have a connection to a test DB
  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(dbName);
  });

  // after all tests will disconnect from the db and delete the test user
  afterAll(async () => {
    await db.collection('users').deleteMany({ name: 'PersonName LastName' });
    await connection.close();
  });

  it('should be possible to get all trades', async () => {
    let resultTrade;
    let resultUser;

    await frisby
      .post(`${url}/users/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 201);

    await frisby
      .post(`${url}/login/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        resultUser = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: resultUser.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/trades`, {
            high: 1.4,
            low: 1.3,
            datetime: '2021-05-20 10:09:00',
            userId: resultUser.id,
            quantity: 1000,
            type: 'buy',
          })
          .expect('status', 201)
          .then((responseTrade) => {
            const { body } = responseTrade;
            resultTrade = JSON.parse(body);
          });
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: resultUser.token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/trades/${resultUser.id}`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toHaveLength(1);
        expect(result[0]).toStrictEqual({
          _id: resultTrade.trade.id,
          high: 1.4,
          low: 1.3,
          datetime: '2021-05-20 10:09:00',
          userId: resultUser.id,
          quantity: 1000,
          status: 'open',
          type: 'buy',
        });
      });
  });

  it('should not be possible to get all trades with a wrong id', async () => {
    let resultTrade;
    let resultUser;

    await frisby
      .post(`${url}/login/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        resultUser = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: resultUser.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/trades`, {
            high: 1.4,
            low: 1.3,
            datetime: '2021-05-20 10:09:00',
            userId: resultUser.id,
            quantity: 1000,
            type: 'buy',
          })
          .expect('status', 201)
          .then((responseTrade) => {
            const { body } = responseTrade;
            resultTrade = JSON.parse(body);
          });
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: resultUser.token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/trades/111`)
      .expect('status', 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid ID');
      });
  });

  it('should not be possible to get all trades with an invalid id', async () => {
    let resultTrade;
    let resultUser;

    await frisby
      .post(`${url}/login/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        resultUser = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: resultUser.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/trades`, {
            high: 1.4,
            low: 1.3,
            datetime: '2021-05-20 10:09:00',
            userId: resultUser.id,
            quantity: 1000,
            type: 'buy',
          })
          .expect('status', 201)
          .then((responseTrade) => {
            const { body } = responseTrade;
            resultTrade = JSON.parse(body);
          });
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: resultUser.token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/trades/60a7f00f05e71c9c1f1d087a`)
      .expect('status', 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('No past trades found');
      });
  });
});

describe('Create an endpoint for update a new trade', () => {
  let db, connection;

  // before all tests will have a connection to a test DB
  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(dbName);
  });

  // after all tests will disconnect from the db and delete the test user
  afterAll(async () => {
    await db.collection('users').deleteMany({ name: 'PersonName LastName' });
    await connection.close();
  });

  it('should not be able to update a trade with invalid entries', async () => {
    let resultTrade;
    let resultUser;

    await frisby
      .post(`${url}/users/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 201);

    await frisby
      .post(`${url}/login/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        resultUser = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: resultUser.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/trades`, {
            high: 1.4,
            low: 1.3,
            datetime: '2021-05-20 10:09:00',
            userId: resultUser.id,
            quantity: 1000,
            type: 'buy',
          })
          .expect('status', 201)
          .then((responseTrade) => {
            const { body } = responseTrade;
            resultTrade = JSON.parse(body);
          });
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: resultUser.token,
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${url}/trades/${resultTrade.trade.id}`, {
        userId: resultUser.id,
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid Entry');
      });
  });

  it('should be able to update a trade successfully', async () => {
    let resultTrade;
    let resultUser;

    await frisby
      .post(`${url}/login/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        resultUser = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: resultUser.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/trades`, {
            high: 1.4,
            low: 1.3,
            datetime: '2021-05-20 10:09:00',
            userId: resultUser.id,
            quantity: 1000,
            type: 'buy',
          })
          .expect('status', 201)
          .then((responseTrade) => {
            const { body } = responseTrade;
            resultTrade = JSON.parse(body);
          });
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: resultUser.token,
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${url}/trades/${resultTrade.trade.id}`, {
        profritOrLoss: 0.30131,
        userId: resultUser.id,
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Status successfully updated');
      });
  });
});
