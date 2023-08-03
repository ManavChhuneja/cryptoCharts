import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/coin-chart", (req, res) => {
  const { coin, lookback } = req.query;
  console.log(coin, lookback);
  res.sendStatus(200);
});

app.get("/coinsData", (req, res) => {
  res.sendFile(path.join(__dirname, "coins.json"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
