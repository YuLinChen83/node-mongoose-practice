import User from './../models/userModel';
import catchAsync from './../utils/catchAsync';
import AppError from './../utils/appError';
import filterObj from './../utils/filterObj';

const getAllUsers = catchAsync(async (req, res, next) => {
  let query = User.find().sort('-takeOfficeDate');
  const users = await query;

  res.status(200).json({
    status: 'success',
    count: users.length,
    data: {
      users
    }
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
    }
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const users = await User.find({ email: req.bodyemail });

  res.status(201).json({
    status: 'success',
    data: {
      users
    }
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        '變更密碼請使用 API /updateMyPassword.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email', 'photo', 'role', 'team', 'takeOfficeDate');
  const user = await User.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    }
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export default {
  getAllUsers,
  createUser,
  getUser,
  updateUserById,
  deleteUserById,
}