const request = require('supertest');
const { app } = require('./../../src/server');


module.exports = async (user) => {
  await request(app)
    .post('/auth/signup')
    .set('content-type', 'application/json')
    .send(user);

  const res = await request(app)
    .post('/auth/signin')
    .set('content-type', 'application/json')
    .send({
      email: user.email,
      password: user.password
    });

  const { token } = res.body;

  return token;
};
