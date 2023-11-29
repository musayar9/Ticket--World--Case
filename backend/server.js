// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://blue-river-005515f10.4.azurestaticapps.net",
    "http://localhost:3000/",
    "https://ticket-verse.vercel.app"
  );
  next();
});
app.use(express.static(path.join(__dirname, "/dist")));

// Diğer tüm yollar için ana sayfayı servis et
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

// Define your routes

const activityRoutes = require("./routes/activityRoutes");
const cityRoutes = require("./routes/cityRoutes");
const usersRoutes = require("./routes/usersRoutes");
app.use("/api/activity", activityRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/users", usersRoutes);

app.get("/", function (req, res) {
  res.send("<h1>Welcome to Ticket World</h1>");
});

// Start the Express server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
