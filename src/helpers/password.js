const bcrypt = require('bcryptjs');

/**
 * create hash string by password and saltRounds
 * @param {{password:string, saltRounds:number}} param0
 */
async function hash({ password, saltRounds = 12 }) {
  return bcrypt.hash(password, saltRounds);
}

/**
 * matching received password with hashString
 * @param {{password:string, hashString:string}} param0
 */
async function match({ password, hashString }) {
  return bcrypt.compare(password, hashString);
}

module.exports = {
  hash,
  match,
};
