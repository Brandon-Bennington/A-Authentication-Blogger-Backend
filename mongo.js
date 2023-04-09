const { MongoClient } = require('mongodb');
const { BLOGS_ATLAS_URI, USERS_ATLAS_URI } = process.env;

let clientBlogs;
let clientUsers;

const connectDB = async () => {
  try {
    // Connect to blog database
    clientBlogs = await MongoClient.connect(BLOGS_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to blog database...');

    // Connect to user database
    clientUsers = await MongoClient.connect(USERS_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to user database...');
  } catch (error) {
    console.error(error);
  }
};

const getBlogDB = () => clientBlogs.db();
const getUserDB = () => clientUsers.db();

module.exports = { connectDB, getBlogDB, getUserDB };
