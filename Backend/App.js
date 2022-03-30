/**
 *
 * @version 1.0
 * @author [Chandan Shukla](chandan.shukla@dal.ca)
 */

const express = require('express');
const app = express();

const cors = require('cors');




app.use(
  cors({
    origin: ["http://localhost:3000", "https://checkout.stripe.com"],
  })
);

app.use(express.json());


module.exports = app;
