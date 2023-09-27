import express from "express";
import cors from "cors";
const app = express();
const port = 4100;

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

module.exports = app;
