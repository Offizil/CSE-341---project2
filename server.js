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


// Catch-all error handler for unhandled errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong on the server",
  });
});

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
