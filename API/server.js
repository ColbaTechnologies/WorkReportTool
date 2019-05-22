if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
const compression = require("compression");
const helmet = require("helmet");
// convert to uppercase

const express = require("express"),
  CognitoExpress = require("cognito-express"),
  port = process.env.API_PORT || process.env.PORT || 5000,
  mongoose = require("mongoose"),
  Company = require("./api/models/companyModel"),
  Employee = require("./api/models/employeeModel"),
  Record = require("./api/models/recordModel"),
  bodyParser = require("body-parser");

const app = express(),
  authenticatedRoute = express.Router();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.API_DB_URL, { useNewUrlParser: true });

app.use("/api", authenticatedRoute);
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
app.use(helmet());

app.use(compression()); //Compress all routes

const cognitoExpress = new CognitoExpress({
  region: "eu-central-1",
  cognitoUserPoolId: "eu-central-1_1hQIS1j8p",
  tokenUse: "access", //Possible Values: access | id
  tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

authenticatedRoute.use(function(req, res, next) {
  //I'm passing in the access token in header under key accessToken
  let accessTokenFromClient = req.headers.accesstoken;

  //Fail if token not present in header.
  if (!accessTokenFromClient)
    return res.status(401).send("Access Token missing from header");

  cognitoExpress.validate(accessTokenFromClient, function(err, response) {
    //If API is not authenticated, Return 401 with error message.
    if (err) return res.status(401).send(err);

    //Else API has been authenticated. Proceed.
    res.locals.user = response;
    next();
  });
});

const routes = require("./api/routes/workCheckinRoutes"); //importing route

routes(authenticatedRoute); //record the route

app.listen(port);

console.log("Work Checkin RESTFUL API server started on: " + port);
