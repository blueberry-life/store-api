function routeNotFound(req, res, next) {
  return res
    .status(404)
    .json({ success: false, data: { msg: "route does not exist" } });
}

module.exports = routeNotFound;
