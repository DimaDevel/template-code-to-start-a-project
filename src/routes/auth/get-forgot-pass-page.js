const pug = require('pug');
const { getTemplatePath } = require('./helpers');


module.exports = async (req, res) => {
  const resetPasswordPage = pug.compileFile(
    getTemplatePath('reset-password.pug'),
  );
  res.send(
    resetPasswordPage(),
  );
};
