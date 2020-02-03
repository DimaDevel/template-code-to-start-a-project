const randomstring = require('randomstring');

const testUser1 = {
  email: randomstring.generate(6) + '@test.com',
  password: randomstring.generate(8),
  firstName: randomstring.generate(6) + 'firstName',
  lastName: randomstring.generate(6) + 'lastName',
  livingArea: 'test address' + randomstring.generate(6),
  coordinates: {
    name: 'test address' + randomstring.generate(6),
    location: {
      type: 'Point',
      coordinates: [31.99423468161117, 46.953703391550405]
    }
  }
};

const testUser2 = {
  email: randomstring.generate(6) + '@test.com',
  password: randomstring.generate(8),
  firstName: randomstring.generate(6) + 'firstName',
  lastName: randomstring.generate(6) + 'lastName',
  livingArea: 'test address' + randomstring.generate(6),
  coordinates: {
    name: 'test address' + randomstring.generate(6),
    location: {
      type: 'Point',
      coordinates: [31.99423468161117, 46.953703391550405]
    }
  }
};

const testUser3 = {
  email: randomstring.generate(6) + '@test.com',
  password: randomstring.generate(8),
  firstName: randomstring.generate(6) + 'firstName',
  lastName: randomstring.generate(6) + 'lastName',
  livingArea: 'test address' + randomstring.generate(6),
  coordinates: {
    name: 'test address' + randomstring.generate(6),
    location: {
      type: 'Point',
      coordinates: [31.99423468161117, 46.953703391550405]
    }
  }
};

module.exports = {
  testUser1,
  testUser2,
  testUser3
};
