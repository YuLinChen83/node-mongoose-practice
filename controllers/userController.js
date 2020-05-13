const tempResponse = res => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
}
const getAllUsers = (req, res) => {
  tempResponse(res);
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
