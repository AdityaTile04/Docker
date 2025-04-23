import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const mongoUrl = "mongodb://aditya:secret@localhost:27017";
const client = new MongoClient(mongoUrl);
const dbName = "demo_db";
let db;

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const usersCollection = db.collection("users");
    await usersCollection.insertOne({ name, email, password });
    res.send(`<h2>Thanks for signing up, ${name}!</h2>`);
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).send("Error saving user.");
  }
});

app.get("/users", async (req, res) => {
  try {
    const usersCollection = db.collection("users");
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
