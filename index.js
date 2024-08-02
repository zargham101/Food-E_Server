const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const dbConnection = require("./db");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    //"http://localhost:3000"
    "https://food-e-client.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: 
    //"http://localhost:3000",
    "https://food-e-client.vercel.app" // Your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add any other headers you need
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
