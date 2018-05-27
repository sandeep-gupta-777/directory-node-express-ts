import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
import mongo from "connect-mongo";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { Request, Response, NextFunction } from "express";

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });
import { routesInit } from "./routes";
import { sendErrRes } from "./routes/helpers";
import { error_Code_Enum } from "./constants/error-codes";
const app = express();
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {useMongoClient: true}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(
  express.static(path.join(__dirname, "public"))
);

let router = routesInit();
app.use(router);
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
    console.dir(err);
    res.locals.err = err;
    sendErrRes(req, res);
});

app.all('*',(req, res)=>{
  res.status(404);
  res.locals.err = new Error(error_Code_Enum.ROUTE_NOT_FOUND.toString());
  sendErrRes(req,res);
});

export default app;