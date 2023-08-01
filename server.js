import express from "express";
import axios from "axios";
import { config } from "dotenv";
import fs from "fs";
config();

const app = express();
const port = 3000;
const topCoins = JSON.parse(fs.readFileSync("./popularCoins.json", "utf-8"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
