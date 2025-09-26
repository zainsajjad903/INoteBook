const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Ye sabse pehle hona chahiye

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // allow all origins temporarily
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.sendStatus(200);
  }
  next();
});

app.options("*", cors());
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀 with CORS enabled");
});

app.listen(port, () => {
  console.log(`INoteBook backend listening on port ${port}`);
});
