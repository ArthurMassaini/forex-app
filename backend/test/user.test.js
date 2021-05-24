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

describe('Create an endpoint for user login', () => {
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

  it('should not be possible to login without email', async () => {
    await frisby
      .post(`${url}/login`, {
        password: '123456',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('All fields must be filled');
      });
  });

  it('should not be possible to login without password', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'personname@gmail.com',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('All fields must be filled');
      });
  });

  it('should not be possible to login with wrong password or wrong email', async () => {
    await frisby
      .post(`${url}/users/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 201);

    await frisby
      .post(`${url}/login`, {
        email: 'personname@gmail.com',
        password: '1234567',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Incorrect username or password');
      });

    await frisby
      .post(`${url}/login`, {
        email: 'personname2@gmail.com',
        password: '123456',
      })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Incorrect username or password');
      });
  });

  it('should be possible to successfully login an user', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.token).toBeDefined();
      });
  });
});

describe('Create an endpoint for get an user by ID', () => {
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

  it('should be possible to get an especific user', async () => {
    let result;

    await frisby
      .post(`${url}/users/`, {
        name: 'PersonName LastName',
        email: 'personname@gmail.com',
        password: '123456',
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
      });

    await frisby
      .get(`${url}/users/${result.user.id}`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.user.name).toBe('PersonName LastName');
        expect(result.user.email).toBe('personname@gmail.com');
        expect(result.user.totalAmount).not.toBeNaN();
      });
  });

  it('should not be possible to get an especific user with invalid id', async () => {
    await frisby
      .get(`${url}/users/000`)
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid Params Entry');
      });
  });

  it('should not be possible to get an especific user with wrong id', async () => {
    await frisby
      .get(`${url}/users/60a7f00f05e71c9c1f1d087a`)
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('User not found');
      });
  });
});
