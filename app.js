const express = require("express");
const axios = require("axios");

// since we have browsable API => +1 for the developers
const API_HOME = "https://api.pmo.gov.et/v1/patients/";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  // Request PMO API homepage
  axios
    .get(API_HOME)
    .then(response => {
      // data is received in one chunk [I believe, check]
      res.end(JSON.stringify(response.data));
    })
    .catch(next);
});

app.post("/", (req, res, next) => {
  // Calling URLs in the browsable API
  const url = req.body.url; // MUST HAVE payload of URL as JSON
  if (!url) next(new Error("No valid URL"));
  axios
    .get(url)
    .then(response => {
      // data is recieved
      res.end(JSON.stringify(response.data));
    })
    .catch(next);
});

app.use((req, res, next) => {
  // page not found
  res.status(404);
  res.end();
});

app.use((err, req, res, next) => {
  // error handler
  res.status(400);
  // log error if you want...
  console.log(err);
  res.end();
});

app.listen(8000);
