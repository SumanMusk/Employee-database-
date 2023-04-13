const express = require("express");
const dotevn = require("dotenv").config();
const {con1,con2} = require("./modules/database");
const port = process.env.PORT || 900; 

const app = express();
app.use(express.urlencoded({extended: false}));
app.use("/", require("./route"));

app.listen(port, () =>{ console.log("hlo"); });
