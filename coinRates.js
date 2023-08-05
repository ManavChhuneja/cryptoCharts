import axios from "axios";
import { config } from "dotenv";
config();

const coinRates = (assetID, lookback, endDate = new Date().toISOString()) => {
  let today = new Date();
  let startDate = new Date(today);
  startDate.setDate(today.getDate() - lookback);
  startDate = startDate.toISOString();

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://rest.coinapi.io/v1/exchangerate/${assetID}/USD/history?period_id=1DAY&time_start=${startDate}&time_end=${endDate}`,
    headers: {
      "X-CoinAPI-Key": process.env.API_KEY,
    },
  };
  return axios
    .request(config)
    .then((response) => {
      const dateRange = response.data.map((element) => {
        return element.time_period_start;
      });
      const rateClose = response.data.map((element) => {
        return element.rate_close;
      });
      return { dates: dateRange, rates: rateClose };
    })
    .catch((error) => {
      console.log(error);
    });
};

export default coinRates;
