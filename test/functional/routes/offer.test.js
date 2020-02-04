const test = require('ava');
const { assert } = require('chai');
const request = require('supertest');
const { app } = require('./../../../src/server');
const { testOffer1 } = require('./../../helpers/get-test-offers');
const { testUser1 } = require('./../../helpers/get-test-users');
const getAuthToken = require('./../../helpers/get-auth-token');
const Offer = require('./../../../src/classes/models-controllers/Offer');

let token;
test.before(async () => {
  token = await getAuthToken(testUser1);
});

test.serial('POST /offers: Should create new offer.', async (t) => {
  const result = await request(app)
    .post('/offers')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(testOffer1)
    .expect(201);

  t.is(testOffer1.title, result.body.title);
  t.is(testOffer1.description, result.body.description);
  t.is(testOffer1.timeOfAction, result.body.timeOfAction);
});

test.serial('GET /offers/{offerId}: Should get info about particular offer.', async (t) => {
  const offerFromDB = await Offer.getOne({ title: testOffer1.title, description: testOffer1.description });
  const result = await request(app)
    .get(`/offers/${offerFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.is(result.body.title, offerFromDB.title);
  t.is(result.body.description, offerFromDB.description);
});

test.serial('GET /offers/inRadius: Should get all offers in radius.', async (t) => {

  const result = await request(app)
    .get('/offers/inRadius?longitude=32.097928135369&latitude=46.94961116636724&radius=5&limit=50')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  assert.isTrue(result.body.docs.length > 0);
  const offerInRadius = result.body.docs[result.body.docs.length - 1];
  t.is(offerInRadius.title, testOffer1.title);
});

test.serial('GET /offers: Should get all offers.', async (t) => {
  const result = await request(app)
    .get('/offers')
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.assert(result.body.docs.length > 0);
});

test.serial('PATCH /offers/:{offerId}: Should update offer in DB', async (t) => {
  const offerFromDB = await Offer.getOne({ title: testOffer1.title, description: testOffer1.description });
  const newOfferDescription = 'new offer description!!!';
  const result = await request(app)
    .patch(`/offers/${offerFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({
      description: newOfferDescription
    })
    .expect(200);
    
  t.is(result.body.description, newOfferDescription);
  const offerFromDBAfterUpdate = await Offer.getOne({ description: newOfferDescription, title: testOffer1.title });
  t.is(offerFromDBAfterUpdate.description, newOfferDescription);
});

test.serial('DELETE /offers/{userId}: Should remove offer by id.', async (t) => {
  const offerFromDB = await Offer.getOne({ title: testOffer1.title });

  const result = await request(app)
    .delete(`/offers/${offerFromDB._id}`)
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  t.is(result.body.title, offerFromDB.title);  
});
