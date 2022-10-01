function queryChecker(name, featured, company) {
  const userQuery = {};
  if (name) {
    userQuery.name = { $regex: name, $options: "i" };
  }
  if (company) {
    userQuery.company = company;
  }
  if (featured) {
    userQuery.featured = featured === "true" ? true : false;
  }
  return userQuery;
}

module.exports = queryChecker;
