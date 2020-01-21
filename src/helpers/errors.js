const { systemCodes } = require('../enums/errors');

function getErrorObject(systemCode, status = 500, error = null) {
  const errorMessage = error ? error.message : null;

  const errorObject = {
    message: errorMessage || systemCodes[systemCode] || 'Something went wrong',
    systemCode
  };
  // this block only for mongo models errors;
  if (error && error.name === 'ValidationError' && error.errors) {
    const errors = {};

    // generate new errorObject like  {'error': [keys]};
    for (let [key, { message }] of Object.entries(error.errors)) {
      const error = message.includes('to be unique')
        ? ' is already in use'
        : message.includes('required')
        ? ' is required'
        : message;
      if (!error.includes('already') && !error.includes('required')) key = '';
      errors[error] ? errors[error].push(key) : (errors[error] = [key]);
    }

    //generate message from errorObject higher in code to string like  Sorry, but this prop1, prop2, ... is already in use || prop1, prop2, ... is required || prop1, prop2, ... errorMessage;
    //And joining all of this messages in One
    errorObject.message = Object.entries(errors)
      .map(([key, value]) =>
        key.includes('already')
          ? 'Sorry, but this ' + value.join(', ') + key
          : value.join(', ') + key
      )
      .join(', ');

    errorObject.systemCode = 'VALIDATION_ERROR';
  }

  const nativeError = new Error();

  nativeError.message = errorMessage;
  nativeError.status = status;
  nativeError.errorObject = errorObject;

  return {
    message: errorObject.message,
    status: error && error.status ? error.status : status
  };
}

module.exports = { getErrorObject };
