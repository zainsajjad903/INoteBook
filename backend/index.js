const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Ye sabse pehle hona chahiye
const whitelist = [
  "https://i-note-book-seven.vercel.app",
  "http://localhost:3000",
  // add other allowed origins here
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, same-origin)
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);

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
