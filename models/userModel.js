import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  account: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
