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
    // const newUser = new userModel(req.body);
    // newUser.save((err) => {
    //   if (err) return handleError(err);
    //   // saved!
    // })

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
const updateUser = (req, res) => {
  tempResponse(res);
};
const deleteUser = (req, res) => {
  tempResponse(res);
};
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
