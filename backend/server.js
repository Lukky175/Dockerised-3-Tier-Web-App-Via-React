const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); // allows JSON body
app.use(cors()); // allow frontend to call backend

// --- MongoDB Connection ---
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/loginApp";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// --- Schema & Model ---
const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  phone: String,
  email: String,
  password: String,
});


const User = mongoose.model("User", UserSchema);

// --- Path to logins.json ---
const loginsPath = path.join(__dirname, "logins.json");

// --- Utility function to read logins.json ---
function readLoginsFile() {
  if (!fs.existsSync(loginsPath)) {
    fs.writeFileSync(loginsPath, "[]", "utf8"); // Create empty file if not exists
  }
  const fileContent = fs.readFileSync(loginsPath, "utf8");
  return JSON.parse(fileContent || "[]");
}

/// --- Login Endpoint ---
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password === password) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Register Endpoint ---
app.post("/register", async (req, res) => {
  const { username, name, phone, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ username, name, phone, email, password });
    await newUser.save();

    // Also save to logins.json
    const logins = readLoginsFile();
    logins.push({ username, name, phone, email, password });
    fs.writeFileSync(loginsPath, JSON.stringify(logins, null, 2), "utf8");

    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// --- Test route ---
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// --- Start server ---
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
