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

app.get("/coinsData", (req, res) => {
  res.sendFile(path.join(__dirname, "coins.json"));
});

app.post("/coins", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.post("/date", (req, res) => {
  console.log(req.body.option);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
