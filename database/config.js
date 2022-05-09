const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('database online');
  } catch (error) {
    console.log(error);
    throw new Error('Error at db connection');
  }
};

module.exports = {
  dbConnection,
};
