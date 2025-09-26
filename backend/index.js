const connectToMongo = require("./Db");
const express = require("express");
const cors = require("cors");
connectToMongo();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello muhammad!");
});

app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`INoteBook backend listening on port ${port}`);
});
