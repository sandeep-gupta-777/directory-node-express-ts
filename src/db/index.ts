
import mongoose from "mongoose";
import { MONGODB_URI } from "../util/secrets";
import bluebird from "bluebird";
import { crud } from "./crud";
import * as helpers from "./dbHelpers";

let dbHelper = {...helpers.deHelper};

// Connect to MongoDB
let dbInit = function(){

    const mongoUrl = MONGODB_URI;
    console.log(mongoUrl);

    (<any>mongoose).Promise = bluebird;
    mongoose.connect(mongoUrl, {useMongoClient: true}).then(
    () => { console.log('DB connected') },
    ).catch((err:any) => {
        console.error("MongoDB connection error " + err);
        process.exit(); //should we exit?
    });
    
};

export{
    dbInit,
    crud,
    dbHelper
}

