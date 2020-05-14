import User from './../models/userModel';

const resErr = (err, res) => {
  res.status(404).json({
    status: 'fail',
    message: err
  });
}
const aliasTopYoungs = (req, res, next) => {
  req.query.age = { "gte": 0 };
  req.query.limit = 3;
  req.query.sort = 'age';
  req.query.fields = 'name,age';
  next();
}
const getAllUsers = async (req, res) => {
  try {
    const queryObject = { ...req.query };
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    excludedFields.forEach(el => delete queryObject[el]);

    // 1. Filtering
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let query = User.find(JSON.parse(queryStr));

    // 2. Sorting
    if (req.query.sort) {
      const sortByStr = req.query.sort.replace(',', ' ');
      query = query.sort(sortByStr);
    } else {
      query = query.sort('-createAt');
    }

    // 3. Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.replace(',', ' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4. Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    if (req.query.page) {
      const numUsers = await User.countDocuments();
      if (skip >= numUsers) throw new Error('The page is not exist.')
    }
    query = query.skip(skip).limit(limit);

    const users = await query;

    res.status(200).json({
      status: 'success',
      data: {
        users,
      }
    });
  } catch (err) {
    resErr(err, res);
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      }
    });
  } catch (err) {
    resErr(err, res);
  }
};
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      }
    });
  } catch (err) {
    resErr(err, res);
  }
};
const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      }
    });
  } catch (err) {
    resErr(err, res);
  }
};
const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    resErr(err, res);
  }
};
export default {
  aliasTopYoungs,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
