import express from "express";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("GCSW API is running...");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
