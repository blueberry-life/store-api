function errorHandler(err, req, res, next) {
  return res.status(500).json({ success: false, data: { msg: err } });
}

module.exports = errorHandler;
