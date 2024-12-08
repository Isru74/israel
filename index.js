const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Enable CORS to allow frontend to communicate with the backend
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the 'public' folder (if needed)
app.use(express.static('public'));

// define the /api/hello route
app.get('/api/hello',
  (req, res) => {
    res.json({ message:
 'HELLO FROM THE BACKEND!' }) ;
    });
  

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost", // Database host
  user: "root",      // Your MySQL username
  password: "your_password",  // Replace with your MySQL password
  database: "gym_website" // Database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL as ID " + db.threadId);
});

// User Registration Route (existing code)
app.post("/register", (req, res) => {
  const { name, email, paymentRef } = req.body;

  if (!name || !email || !paymentRef) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = "INSERT INTO users (name, email, payment_ref) VALUES (?, ?, ?)";
  db.query(query, [name, email, paymentRef], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: "Error registering user." });
    }
    res.status(201).json({ success: true });
  });
});

// Route to fetch all registered users
app.get("/users", (req, res) => {
  const query = "SELECT id, name, email, payment_ref FROM users"; // Query to fetch registered users
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Error fetching users." });
    }
    res.status(200).json(results);  // Return the list of users as JSON
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
