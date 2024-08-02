const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const dbConnection = require("./db");
app.use(express.json());
app.use(
  cors({
    origin:
      //"http://localhost:3000",
      "https://food-e-client.vercel.app", // Your frontend origin
    credentials: true,
  })
);

dbConnection();

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${process.env.PORT || port}`);
});
