
import express from "express";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
// mongoose.connect("mongodb://localhost:27017/signupDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("✅ Connected to MongoDB");
// }).catch(err => {
//   console.error("❌ MongoDB connection error:", err);
// });

// Mongoose Schema and Model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); 
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.send(`<h2>Thanks for signing up, ${name}!</h2>`);
  } catch (err) {
    res.status(500).send("Error saving user.");
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
