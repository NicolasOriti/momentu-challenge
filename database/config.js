const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Database is online');
  } catch (error) {
    console.log(error);
    throw new Error('Error at initializing');
  }
};

module.exports = {
  dbConnection,
};
