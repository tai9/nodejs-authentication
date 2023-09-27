import express from "express";
const app = express();
const port = 4100;

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
