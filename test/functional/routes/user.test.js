const test = require('ava');
const { assert } = require('chai');
const request = require('supertest');
const { app } = require('./../../../src/server');
const { testUser1 } = require('./../../helpers/get-test-users');
const getAuthToken = require('./../../helpers/get-auth-token');
const User = require('./../../../src/classes/models-controllers/User');
const { userRoles } = require('./../../../src/enums/user');

let token;
test.before(async () => {
  token = await getAuthToken(testUser1);
});

test.serial('GET /users/me: Should get info about current user.', async (t) => {
  const result = await request(app)
    .get('/users/me')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.is(testUser1.email.toLowerCase(), result.body.email);
  t.is(testUser1.lastName, result.body.lastName);
  t.is(testUser1.firstName, result.body.firstName);
  assert.equal(testUser1.coordinates.name, result.body.coordinates.name);
});

test.serial('GET /users/{userId}: Should get info about current user by id', async (t) => {
  const userFromDB = await User.getOne({ email: testUser1.email });
  const result = await request(app)
    .get(`/users/${userFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.is(testUser1.email.toLowerCase(), result.body.email);
  t.is(testUser1.lastName, result.body.lastName);
  t.is(testUser1.firstName, result.body.firstName);
  assert.equal(testUser1.coordinates.name, result.body.coordinates.name);
});

test.serial('PATCH /users/me: Should update user in DB', async (t) => {
  const newFirstName = 'new first name';
  const newLastName = 'new last name';
  const result = await request(app)
    .patch('/users/me')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      firstName: newFirstName,
      lastName: newLastName
    })
    .expect(200);

  t.is(result.body.firstName, newFirstName);
  t.is(result.body.lastName, newLastName);
});

test.serial('PATCH /users/:{userId}: Should update user in DB', async (t) => {
  const userFromDB = await User.getOne({ email: testUser1.email });
  const newFirstName = 'new first name!!!';
  const newLastName = 'new last name!!!';
  const result = await request(app)
    .patch(`/users/${userFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      firstName: newFirstName,
      lastName: newLastName
    })
    .expect(200);

  t.is(result.body.firstName, newFirstName);
  t.is(result.body.lastName, newLastName);
});

test.serial('GET /users/inRadius: Should un ban user.', async (t) => {

  const result = await request(app)
    .get('/users/inRadius?longitude=32.097928135369&latitude=46.94961116636724&radius=5&limit=50')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  assert.isTrue(result.body.docs.length > 0);
  const userInRadius = result.body.docs[result.body.docs.length - 1];
  t.is(userInRadius.email, testUser1.email.toLowerCase());
});

test.serial('GET /users: Should get all users.', async (t) => {
  const result = await request(app)
    .get('/users')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.assert(result.body.docs.length > 0);
});

test.serial('DELETE /users/{userId}: Should remove user by id.', async (t) => {
  const userFromDB = await User.getOne({ email: testUser1.email });
  userFromDB.role = userRoles.ADMIN;
  await userFromDB.save();

  const result = await request(app)
    .delete(`/users/${userFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.is(result.body.email.toLowerCase(), userFromDB.email);  
});
