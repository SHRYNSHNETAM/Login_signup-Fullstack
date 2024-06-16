
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://iit2020177:njDUSmSDFJGlg2Xa@cluster0.qhx8pnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function addData(client, newListings){
  const result = await client.db("LoginDB").collection("Users").insertOne(newListings);

  console.log(`New listing created with the following id: ${result.insertedId}`);     
}

async function findData(client, nameOfListing, password) {
  const result = await client.db("LoginDB").collection("Users").findOne({ Email: nameOfListing , Pass: password});
  return result;
}

async function deleteData(client, nameOfListing) {
  const result = await client.db("LoginDB").collection("Users").deleteOne({ Email: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

module.exports = {client,findData,addData,deleteData};