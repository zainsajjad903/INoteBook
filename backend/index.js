const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

connectToMongo();

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: "https://i-note-book-seven.vercel.app", // Vercel frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`INoteBook backend listening on port ${PORT}`);
});
