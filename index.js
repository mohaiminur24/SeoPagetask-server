const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT | 5000;


// Here is all middlewere
app.use(cors());
app.use(express.json());



// MongoDB connection from here
const uri = `mongodb+srv://${process.env.Mongodb_user}:${process.env.Mongodb_pass}@cluster0.85env82.mongodb.net/?retryWrites=true&w=majority`;


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
    // await client.connect();

    const database = client.db("seopage");
    const completed = database.collection("completed");
    const doing = database.collection("doing");
    const incomplete = database.collection("incomplete");
    const overday = database.collection("overday");
    const todo = database.collection("todo");
    const underReview = database.collection("underReview");

    app.get("/getincomplete", async(req,res)=>{
        try {
            const result = await incomplete.find().toArray();
            res.send(result);
        } catch (error) {
            console.log("getincomplete route is not woking properly");
        }
    });
    app.get("/getcompleted", async(req,res)=>{
        try {
            const result = await completed.find().toArray();
            res.send(result);
        } catch (error) {
            console.log("getincomplete route is not woking properly");
        }
    });
    app.get("/getdoing", async(req,res)=>{
        try {
            const result = await doing.find().toArray();
            res.send(result);
        } catch (error) {
            console.log("getincomplete route is not woking properly");
        }
    });
    app.get("/getoverday", async(req,res)=>{
        try {
            const result = await overday.find().toArray();
            res.send(result);
        } catch (error) {
            console.log("getincomplete route is not woking properly");
        }
    });
    app.get("/gettodo", async(req,res)=>{
        try {
            const result = await todo.find().toArray();
            res.send(result);
        } catch (error) {
            console.log("getincomplete route is not woking properly");
        }
    });
    app.get("/getunderReview", async(req,res)=>{
        try {
            const result = await underReview.find().toArray();
            res.send(result);
        } catch (error) {
            console.log("getincomplete route is not woking properly");
        }
    });












    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.get("/", (req,res)=>{
    res.send("Server is running..........");
});


app.listen(port, ()=>{
    console.log(`Server is running on PORT ${port}`);
});
