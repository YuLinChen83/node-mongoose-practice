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
    res.status(200).json({
      status: 'success',
      data: {
        user: newUser,
      }
    });
  } catch (err) {
    resErr(err, res);
  }
};
const updateUserById = (req, res) => {
  // practice
};
const deleteUserById = (req, res) => {
  // practice
};
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
