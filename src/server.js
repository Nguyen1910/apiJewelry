const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const initWebRoutes = require("./routes/web");
const configViewEngine = require("./config/viewEngine");
const dotenv = require("dotenv");
const multer = require("multer");
const connectDB = require("./config/connectDB");

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(multer().array());
// app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());

configViewEngine(app);
initWebRoutes(app);
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
