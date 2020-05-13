import userModel from './../models/userModel';

const resErr = (err, res) => {
  res.status(404).json({
    status: 'fail',
    message: err
  });
}
const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find();
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
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
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
    const newUser = await userModel.create(req.body);
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
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
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
    await userModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    resErr(err, res);
  }
};
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
