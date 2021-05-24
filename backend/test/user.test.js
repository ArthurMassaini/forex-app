const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/ForexTest';
const dbName = 'ForexTest';
const url = 'http://localhost:3000';

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
    
  // after all tests will disconnect from the db and drop the collection
  afterAll(async () => {
    await connection.db.dropCollection('users');
    await connection.close();
  });

  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
