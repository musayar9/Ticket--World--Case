// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Define your routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

const activityRoutes = require("./routes/activityRoutes");
const cityRoutes = require("./routes/cityRoutes");
const usersRoutes = require("./routes/usersRoutes");
app.use("/api/activity", activityRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/users", usersRoutes);

// Start the Express server
const port = process.env.PORT || 5030;
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
