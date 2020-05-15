import User from './../models/userModel';
import APIFeatures from './../utils/apiFeatures';

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
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const users = await features.query;

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
