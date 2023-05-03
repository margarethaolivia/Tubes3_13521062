const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
let bodyParser = require("body-parser");
const { handleQuery} = require("./src/algorithm/regex")
require("dotenv").config();

const historyRoute = require("../backend/routes/history.route");
const qnaRoute = require("../backend/routes/qna.route");
const tabRoute = require("../backend/routes/tab.route");

// middleware
const corsOptions = {
  origin: "http://localhost:3000", // frontend URI (ReactJS)
};
app.use(express.json());
app.use(cors(corsOptions));

// connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {autoIndex : true})
  .then((x) => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
      console.log(`App is Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/chat", historyRoute);
app.use("/qna", qnaRoute);
app.use("/tab", tabRoute);

// route
app.get("/", (req, res) => {
  res.status(201).json({ message: "Connected to Backend!" });
});

// Call this to get answer
// handleQuery("Apa Ibukota Indo; hari apa 23/05/2023", 1).then(response => console.log(response))