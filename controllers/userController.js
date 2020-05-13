import userModel from './../models/userModel';
const tempResponse = res => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
}
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
const getUser = (req, res) => {
  tempResponse(res);
};
const createUser = (req, res) => {
  tempResponse(res);
};
const updateUser = (req, res) => {
  tempResponse(res);
};
const deleteUser = (req, res) => {
  tempResponse(res);
};
export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
