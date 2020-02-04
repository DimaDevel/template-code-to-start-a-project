const test = require('ava');
const request = require('supertest');
const { app } = require('./../../../src/server');
const { testInterestCategory1 } = require('./../../helpers/get-test-interest-categories');
const { testUser1 } = require('./../../helpers/get-test-users');
const getAuthToken = require('./../../helpers/get-auth-token');
const User = require('./../../../src/classes/models-controllers/User');
const { userRoles } = require('./../../../src/enums/user');

let token;
test.before(async () => {
  token = await getAuthToken(testUser1);
});

test.serial('POST /offers: Should create new offer.', async (t) => {
  const userFromDB = await User.getOne({ email: testUser1.email });
  userFromDB.role = userRoles.ADMIN;
  await userFromDB.save();
  const result = await request(app)
    .post('/interestCategories')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(testInterestCategory1)
    .expect(201);

  t.is(testInterestCategory1.title, result.body.title);
  t.is(testInterestCategory1.description, result.body.description);
});
