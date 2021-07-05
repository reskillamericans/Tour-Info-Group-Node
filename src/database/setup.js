const mongoose = require('mongoose');
const connectionString = process.env.DATABASE_URL;

module.exports = function () {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch((err) => {
      console.log('MONGO CONNECTION ERROR!!!!');
      console.log(err);
    });
};
