import express from 'express';
import morgan from 'morgan';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // HTTP request logger
}
app.use(express.json());  // for parsing application/json

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

// 原本寫法
// app.get('/api/users', getAllUsers);
// app.get('/api/users/:id', getUser);
// app.post('/api/users', createUser);
// app.patch('/api/users/:id', updateUser);
// app.delete('/api/users/:id', deleteUser);

// 可改用 app.route 合併重複 route
app
  .route('/api/users')
  .get(getAllUsers)
  .post(createUser);

app
  .route('/api/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default app;
