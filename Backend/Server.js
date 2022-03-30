const app = require("./App");
const { MongoClient } = require("mongodb");
const userRouter = require("./routes/userRoute");
const userprofileRouter = require("./routes/userprofileRoute");
const jwt = require("jsonwebtoken");
const constants = require("./constants/Constants");
const productRouter = require("./routes/productdisplay");
const orderRouter = require("./routes/orderRoute");

const updateCart = require("./routes/updateCart");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const ratingRouter = require("./controllers/ReviewandRatingController");

const stripePaymentRouter = require("./routes/stripePaymentRoute");

const searchRouter = require("./routes/searchRoute");

const adminproductRouter = require("./routes/productRoute");

dotenv.config({ path: __dirname + "/./configs/setup.env" });
require("./models/userModel");
// require("./models/user");
require("./models/product");

// dotenv.config({path:__dirname + '/./configs/setup.env'});
dotenv.config();

const verifyJWT = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    res.send({
      success: false,
      message: "401 User unauthorised",
    });
  } else {
    jwt.verify(token, constants.JWTSECRET, (err, decoded) => {
      if (err) {
        res.send({
          success: false,
          status: 401,
          message: "401 User unauthorised",
        });
      } else {
        next();
      }
    });
  }
};

app.use(userprofileRouter);
app.use(productRouter);


app.use(orderRouter);
app.use(adminproductRouter);
app.use(ratingRouter);



app.use(searchRouter);
app.use(userRouter);
app.use(verifyJWT);

app.use(userRouter);
app.use(verifyJWT);

app.use(updateCart);

async function main() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

main().catch(console.error);
