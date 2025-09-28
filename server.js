const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");

const port = process.env.PORT || 5000;
const app = express();

const router = require("./routes/index"); // Import the index route

// middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accecpt, z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// error handling for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(
    process.stderr.fd,
    "Uncaught Exception: ${err}\n = `Exception origin: ${origin}`"
  );
});

app.use("/", router); // Use the index route for the root path

// default route
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// routes
// const inventoryRoutes = require("./routes/inventory");
// app.use("/inventory", inventoryRoutes); // Use inventory routes for /inventory path

// connect to database and start server
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Connected to database and listening on port ${port}`);
    });
  }
});

app.listen(port, () => {
  console.log("Web Server is listening at port " + port);
});
