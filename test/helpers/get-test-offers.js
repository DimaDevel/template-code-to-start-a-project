const randomstring = require('randomstring');

const testOffer1 = {
  title: 'test offer' + randomstring.generate(6),
  description: 'test description',
  timeOfAction: 3,
  // todo need create date with Date.
  startDate: '2020-02-04T09:25:37.042Z',
  endDate: '2020-09-04T09:25:37.042Z',
  status: 'opened',
  coordinates: {
    name: 'test address' + randomstring.generate(6),
    location: {
      type: 'Point',
      coordinates: [31.99423468161117, 46.953703391550405]
    }
  }
};
module.exports = {
  testOffer1
};
