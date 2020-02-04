const test = require('ava');
const request = require('supertest');
const { app } = require('./../../../src/server');
const { getTestBusiness } = require('./../../helpers/get-test-business');
const { testUser1 } = require('./../../helpers/get-test-users');
const getAuthToken = require('./../../helpers/get-auth-token');
const Business = require('./../../../src/classes/models-controllers/Business');
const User = require('./../../../src/classes/models-controllers/User');
const { userRoles } = require('./../../../src/enums/user');

let token;
let testBusiness;
test.before(async () => {
  token = await getAuthToken(testUser1);
  testBusiness = await getTestBusiness();
});

test.serial('POST /business: Should create new business.', async (t) => {
  const userFromDB = await User.getOne({ email: testUser1.email });
  userFromDB.role = userRoles.ADMIN;
  await userFromDB.save();
  const result = await request(app)
    .post('/business')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(testBusiness)
    .expect(201);
  
  t.is(testBusiness.name, result.body.name);
  t.is(testBusiness.description, result.body.description);
  t.is(testBusiness.phone, result.body.phone);
});

test.serial('GET /business/{businessId}: Should get info about particular business.', async (t) => {
  const businessFromDB = await Business.getOne({ title: testBusiness.title, description: testBusiness.description });
  const result = await request(app)
    .get(`/business/${businessFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.is(result.body.title, testBusiness.title);
  t.is(result.body.description, testBusiness.description);
});

test.serial('GET /business: Should get all business.', async (t) => {
  const result = await request(app)
    .get('/business')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.assert(result.body.docs.length > 0);
});

test.serial('PATCH /business/:{offerId}: Should update business in DB', async (t) => {
  const businessFromDB = await Business.getOne({ title: testBusiness.title, description: testBusiness.description });
  const newBusinessDescription = 'new business description!!!';
  const result = await request(app)
    .patch(`/business/${businessFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      description: newBusinessDescription
    })
    .expect(200);
    
  t.is(result.body.description, newBusinessDescription);
  const offerFromDBAfterUpdate = await Business.getOne({ description: newBusinessDescription, title: testBusiness.title });
  t.is(offerFromDBAfterUpdate.description, newBusinessDescription);
});

test.serial('DELETE /business/{userId}: Should remove business by id.', async (t) => {
  const businessFromDB = await Business.getOne({ title: testBusiness.title });

  const result = await request(app)
    .delete(`/business/${businessFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.is(result.body.title, businessFromDB.title);  
});
