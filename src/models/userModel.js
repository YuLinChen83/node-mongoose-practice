import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  account: {
    type: String,
    unique: true,
    required: true,
    maxlength: [20, '帳號最多20個字'],
    minlength: [5, '帳號最少5個字']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true,
  },
  age: Number,
  description: String,
  birthday: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
});

const User = model('User', userSchema);

export default User;
