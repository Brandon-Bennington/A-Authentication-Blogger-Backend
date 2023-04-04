const { MongoClient } = require("mongodb");
const { Schema, model } = require("mongoose");

let database;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
  userType: { type: String, required: true },
});

const User = model("User", userSchema);

async function mongoConnect() {
  // Connection URI
  const uri = process.env.MONGO_URI;
  // Create a new MongoClient
  const client = new MongoClient(uri);
  try {
    // Connect the client to the server
    await client.connect();
    database = await client.db(process.env.MONGO_DATABASE);
    // Establish and verify connection
    console.log("db connected");
  } catch (error) {
    throw Error("Could not connect to MongoDB. " + error);
  }
}
function db() {
  return database;
}
module.exports = {
  mongoConnect,
  db,
  User,
};


/*const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI; // Make sure you have set up the environment variable in your .env file
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;

let database;

const { Schema, model } = require("mongodb");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = model("User", UserSchema);
module.exports.User = User;

async function mongoConnect() {
	// Connection URI
	const uri = process.env.MONGO_URI;
	// Create a new MongoClient
	const client = new MongoClient(uri);
	try {
		// Connect the client to the server
		await client.connect();
		database = await client.db(process.env.MONGO_DATABASE);
		// Establish and verify connection
		console.log("db connected");
	} catch (error) {
		throw Error("Could not connect to MongoDB. " + error);
	}
}
function db() {
	return database;
}
module.exports = {
	mongoConnect,
	db,
};
*/