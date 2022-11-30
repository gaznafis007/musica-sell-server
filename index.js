const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("musica Api running");
});

const uri = `mongodb+srv://dbUser:${process.env.DB_PASS}@cluster0.rtovm4s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const itemCollection = client.db("musicadb").collection("items");
    const userCollection = client.db("musicadb").collection("users");
    const productCollection = client.db("musicadb").collection("products");
    app.get("/items", async (req, res) => {
      const query = {};
      const items = await itemCollection.find(query).toArray();
      res.send(items);
    });
    app.post("/products", async (req, res) => {
      const product = req.body;
      const products = await productCollection.insertOne(product);
      res.send(products);
    });
    app.get("/products", async (req, res) => {
      let query = {};
      if (req.query.email) {
        const email = req.query.email;
        query = { sellerEmail: email };
      }
      const products = await productCollection.find(query).toArray();
      res.send(products);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const users = await userCollection.insertOne(user);
      res.send(users);
    });
    app.get("/users", async (req, res) => {
      let query = {};
      if (req.query.email) {
        const email = req.query.email;
        query = { email: email };
      }
      const users = await userCollection.find(query).toArray();
      res.send(users);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("musica is running at port", port);
});
