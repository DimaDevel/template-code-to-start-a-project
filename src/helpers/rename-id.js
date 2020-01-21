module.exports = (doc, ret) => {
  delete ret._id;
  return ret;
};
