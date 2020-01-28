const AWS = require('aws-sdk');
const error = require('debug')('app:error:media/sign-url');
const config = require('../../config/config');
const { getErrorObject } = require('../../helpers/errors');
const bugTracker = require('./../../classes/BugTracker');

AWS.config.update({
  accessKeyId: config.S3_ACCESS_KEY,
  secretAccessKey: config.S3_SECRET_KEY,
  region: config.S3_REGION,
  signatureVersion: 'v4',
});

const s3 = new AWS.S3();


// it's route for create sign url for file upload
module.exports = async (req, res) => {
  const { body } = req;

  if (!body.fileName) throw getErrorObject('SIGN_URL_NO_FILE_NAME', 400);

  if (!body.fileType) throw getErrorObject('SIGN_URL_NO_FILE_TYPE', 400);
  const Key = `media/${Date.now()}/${body.fileName.split(' ').join('_')}`;

  const params = {
    Bucket: config.S3_BUCKET_NAME,
    Key,
    ACL: 'public-read',
    ContentType: body.fileType,
  };

  try {
    const signedUrl = await s3.getSignedUrl('putObject', params);
    res.json({ signedUrl });
  } catch (err) {
    error(err);
    bugTracker.captureException(err);
    throw getErrorObject('GENERAL_ERROR', 400, err);
  }
};
