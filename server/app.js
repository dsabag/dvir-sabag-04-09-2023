import express from "express";
import { readFile } from "node:fs";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/config", (_req, res, next) => {
  readFile("config.json", (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(
    "Server is Successfully Running,and App is listening on port " + PORT
  );
});
