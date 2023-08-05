import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import coinRates from "./coinRates.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const { coin = "BTC", lookback = "7" } = req.query;
  console.log(coin, lookback);
  let myData;
  try {
    myData = await coinRates(coin, lookback);
  } catch (error) {
    console.log(error);
  }
  console.log(myData);
  res.render("index.ejs", { ...myData, coin: coin });
});

app.get("/coinsData", (req, res) => {
  res.sendFile(path.join(__dirname, "coins.json"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
