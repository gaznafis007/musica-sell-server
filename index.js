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
    app.get("/items", async (req, res) => {
      const query = {};
      const items = await itemCollection.find(query).toArray();
      res.send(items);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("musica is running at port", port);
});
