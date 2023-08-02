import express from "express";
import axios from "axios";
import { config } from "dotenv";
config();

let today = new Date().toISOString();

const getThirtyDayRates = (
  assetID,
  startDate,
  endDate = new Date().toISOString()
) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://rest.coinapi.io/v1/exchangerate/${assetID}/USD/history?period_id=12HRS&time_start=${startDate}&time_end=${endDate}`,
    headers: {
      "X-CoinAPI-Key": process.env.API_KEY,
    },
  };
  axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getThirtyDayRates;
