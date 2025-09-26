const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS middleware (important)
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://i-note-book-seven.vercel.app", // vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"], // important for JWT
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(port, () => {
  console.log(`INoteBook backend listening on port ${port}`);
});
