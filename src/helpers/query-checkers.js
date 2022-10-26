//  * this function take 3 arguments and checks req.query contains them or not and create new object with them and return it
function queryChecker(userReq) {
  const userQuery = {};
  if (userReq.name) {
    userQuery.name = { $regex: name, $options: "i" };
  }
  if (userReq.company) {
    userQuery.company = company;
  }
  if (userReq.featured) {
    userQuery.featured = featured === "true" ? true : false;
  }
  // * this code add numeric filter function to the query checker and converts mongoose numeric operators to user friendly math operators
  if (userReq.numericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = userReq.numericFilter.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((element) => {
      const [field, operator, value] = element.split("-");
      if (options.includes(field)) {
        userQuery[field] = { [operator]: Number(value) };
      }
    });
  }
  return userQuery;
}

// * this function checks if user provide field and modify query base on user input
function fieldChecker(userReq, result) {
  const field = userReq.field;
  if (field) {
    const fieldList = field.split(",").join(" ");
    result = result.select(fieldList);
  }
  return result;
}

// * this function checks if user provide sort and modify query base on user input
function sortChecker(userReq, result) {
  const sort = userReq.sort;
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  return result;
}

// * this function adds pagination to query object
function pagination(userReq, result) {
  const limit = Number(userReq.limit) || 10;
  const page = Number(userReq.page) || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
}

module.exports = {
  sortChecker,
  fieldChecker,
  queryChecker,
  pagination,
};
