require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");

const bfhlRoutes = require("./routes/bfhlRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/bfhl", bfhlRoutes);
app.use("/health", healthRoutes);

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Route Not Found"
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    error: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (e) => {
  console.error("Server Error:", e);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = app;