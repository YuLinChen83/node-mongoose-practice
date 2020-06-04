export default class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObject = { ...this.queryString };
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    excludedFields.forEach(el => delete queryObject[el]);

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortByStr = this.queryString.sort.replace(',', ' ');
      this.query = this.query.sort(sortByStr);
    } else {
      this.query = this.query.sort('-createAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.replace(',', ' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}