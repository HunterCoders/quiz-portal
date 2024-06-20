//app.js

const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use("/.netlify/functions/app.cjs", require("../src/index.cjs"));
module.exports.handler = serverless(app);