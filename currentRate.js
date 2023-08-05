import axios from "axios";
import { config } from "dotenv";
config();

const currentRate = (assetID) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://rest.coinapi.io/v1/exchangerate/${assetID}/USD`,
    headers: {
      "X-CoinAPI-Key": process.env.API_KEY,
    },
  };
  return axios
    .request(config)
    .then((response) => {
      return response.data.rate;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default currentRate;
