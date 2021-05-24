const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/Forex';
const dbName = 'Forex';
const url = 'http://localhost:3001';

describe('Create an endpoint for user registration', () => {
  let db, connection;

  // before all tests will have a connection to a test DB
  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(dbName);
  });

  // beforeEach(() => async () => {
  //   await db.collection('users').deleteMany({ name: 'PersonName LastName' });
  // });

  //   afterEach(() => async () => {
  //     await db.collection('users').deleteMany({ name: 'PersonName LastName' });
  //   });

  // after all tests will disconnect from the db and delete the test user
  afterAll(async () => {
    await db.collection('users').deleteMany({ name: 'PersonName LastName' });
    await connection.close();
  });

  it('should not be possible to register without name', async () => {
    await frisby
      .post(`${url}/users`, {
        email: 'person@gmail.com',
        password: '123456',
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('should not be possible to register without email', async () => {
    await frisby
      .post(`${url}/users`, {
        name: 'PersonName LastName',
        password: '123456',
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('should not be possible to register without password', async () => {
    await frisby
      .post(`${url}/users`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('should be possible to successfully register an user', async () => {
    await frisby
      .post(`${url}/users/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.user.name).toBe('PersonName LastName');
        expect(result.user.email).toBe('personname@gmail.com');
        expect(result.message).toBe('Registration successfully completed');
      });
  });

  it('should not be possible to register an user with the same email', async () => {
    await frisby
      .post(`${url}/users/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 409)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Already have an user with that email.');
      });
  });
});
