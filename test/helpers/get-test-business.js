const randomstring = require('randomstring');
const InterestCategory = require('./../../src/classes/models-controllers/InterestCategory');
const { testInterestCategory1 } = require('./../helpers/get-test-interest-categories');

const getTestBusiness = async () => {

  const interestCategory = await InterestCategory.getOne({ title: testInterestCategory1.title });

  const testBusiness = {
    name: 'name' + randomstring.generate(6),
    description: 'description' + randomstring.generate(6),
    category: interestCategory._id,
    phone: randomstring.generate(6),
    corporateEmail: randomstring.generate(6) + '@test.com',
    country: randomstring.generate(6),
    city: randomstring.generate(6),
    address: randomstring.generate(6)
  };

  return testBusiness;
};

module.exports = {
  getTestBusiness
};
