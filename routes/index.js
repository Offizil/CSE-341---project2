const express = require("express");
const router = express.Router();

router.use("/", require("./swagger")); // Swagger documentation route

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>API Home</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
          h1 { color: #333; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 10px 0; }
          a {
            display: inline-block;
            padding: 8px 12px;
            background: #800000;
            color: white;
            text-decoration: none;
            border-radius: 4px;
          }
          a:hover { background: #800000; }
        </style>
      </head>
      <body>
        <h1>🚀 Welcome to My Week 3 API</h1>
        <p>Select a route below to test:</p>
        <ul>
          <li><a href="/players" target="_blank">View All Players</a></li>
          <li><a href="/staffs" target="_blank">View All Staff</a></li>
          <li><a href="/api-docs" target="_blank">API Documentation</a></li>
        </ul>
      </body>
    </html>
  `);
});

router.use("/players", require("./players")); // player routes

router.use("/staffs", require("./staffs")); // staff routes

module.exports = router;
