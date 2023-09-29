// server.js
const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000; // Choose a port number

app.use(cors({
  origin: 'http://localhost:8084'
}));

const { MongoClient, ServerApiVersion, Int32 } = require('mongodb');
const { stringifyQuery } = require('vue-router');
require('dotenv').config(); // Load environment variables from .env file
const uri = "mongodb+srv://mj_db:Vmp2w97OOVvb0zcK@cluster0.efjqhqn.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Set up Schema and Model for collection
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mj_db:Vmp2w97OOVvb0zcK@cluster0.efjqhqn.mongodb.net/", {dbName: 'HiddenValley'}, {collection: 'workshops'});
const {Schema } = mongoose;

const mySchema = new Schema({
  _id: String,
  name: String,
  date: Date,
  clicks: Number,
  text: String,
  image: String,
  show: Boolean,
  premium: Boolean,
}, { collection : 'workshops' });   

const MyModel = mongoose.model('MyModel', mySchema);

app.get('/getData', async (req, res) => {
  try {
      const data = await MyModel.find({}); // Retrieve data from MongoDB
      res.send(data); // Send the retrieved data as a response
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data');
  }
});

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
})

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});