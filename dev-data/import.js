import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './../src/models/userModel';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    console.log(`DB connection error: ${err.message}`);
  });

const importData = async () => {
  try {
    const users = JSON.parse(
      fs.readFileSync(`${__dirname}/init-users.json`, 'utf-8')
    );
    await User.create(users);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}