const test = require('ava');
const request = require('supertest');
const { app } = require('./../../../src/server');

test('GET /: Should get message: "Welcome to Blizzz API!"', async (t) => {
  const result = await request(app)
    .get('/')
    .expect(200);
  t.is(result.status, 200);
  t.is(result.body, 'Welcome to Blizzz API!');
});
