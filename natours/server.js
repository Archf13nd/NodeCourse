const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB CONNECTION HAPPY');
  });

const app = require('./app');

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
