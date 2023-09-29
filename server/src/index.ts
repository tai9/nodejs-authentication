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

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default app;
