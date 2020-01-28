module.exports = async (model, longitude, latitude, radius, paginateOpt) => {
  const docs = await model.paginate({
    'coordinates.location': {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius / 3963.2]
      }
    }
  }, {
    page: paginateOpt.page,
    limit: paginateOpt.limit,
    sort: paginateOpt.sort
  });
  if (!docs) throw this.notFoundError;

  return docs;
};
