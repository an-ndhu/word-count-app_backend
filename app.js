const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config({ path: "./config/.env" });

connectDB();

// express initialization
const app = express();

// Body parser
app.use(express.json());

app.use(
  cors({
    credentials: true,
  })
);

//Routefiles
const users = require("./routes/user");
const insight = require("./routes/insights");

// useRoutes
app.use("/api/v1/insights", insight);
app.use("/api/v1/users", users);
// handling not catchable error as server error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});
app.use("/", (req, res) => {
  res.send("Hello");
});
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in  mode on port ${PORT}`)
);
