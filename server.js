import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import coinRates from "./coinRates.js";
import currentRate from "./currentRate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  let currentCoinRate;
  try {
    currentCoinRate = await currentRate(coin);
    if (currentCoinRate !== undefined) {
      currentCoinRate = currentCoinRate.toFixed(2);
    }
  } catch (error) {
    console.log(error);
  }
  let dates, rates;
  if (myData) {
    dates = myData.dates;
    rates = myData.rates;
    console.log(dates);
  }

  res.render("index.ejs", {
    dates: dates,
    rates: rates,
    coin: coin,
    currentRate: currentCoinRate,
  });
});

app.get("/coinsData", (req, res) => {
  res.sendFile(path.join(__dirname, "coins.json"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
