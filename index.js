const express = require("express");
const app = express();
const port = 1335;
const router = require("./router");
const openai = require('openai');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(router);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
