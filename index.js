const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const dbConnection = require("./db");

app.use(
  cors({
    origin:
      //"http://localhost:3000",
      "https://food-e-client.vercel.app", // Your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

dbConnection();

app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
