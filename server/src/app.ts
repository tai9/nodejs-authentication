import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

app.set("port", process.env.PORT || 4100);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export default app;
