import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './../src/models/tourModel';

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
    const tours = JSON.parse(
      fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
    );
    console.log(tours);
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
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