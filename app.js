import express from 'express';
import morgan from 'morgan';
const userRouter = require('./routes/userRoutes');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // HTTP request logger
}
app.use(express.json());  // for parsing application/json

app.use('/api/v1/users', userRouter);

export default app;
