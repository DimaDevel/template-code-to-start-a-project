const randomstring = require('randomstring');

const testInterestCategory1 = {
  name: 'category' + randomstring.generate(6),
  description: 'description' + randomstring.generate(6)
};

module.exports = {
  testInterestCategory1
};
