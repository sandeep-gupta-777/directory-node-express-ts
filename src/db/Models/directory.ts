import mongoose from "mongoose";
import { error_Code_Enum } from "../../constants/error-codes";
const beautifyUnique = require('mongoose-beautiful-unique-validation');
/*
*For every phone number there will be a saturate record in the table
*If owner is having two different Phones these two record will have same owner id
* */
interface IDirEntry{
    USER_ID?:string,
    OWNER_ID?:string,
    OWNER_NAME?:string,
    OWNER_ADDRESS?:string,
    OWNER_STATE?:string,
    OWNER_COUNTRY_CODE?:string,
    OWNER_CATEGORY?:number,
    OWNER_PHONE?:number,
    OWNER_PHONE_id?:string
};


const dirEntrySchema = new mongoose.Schema({

    USER_ID:{
        type:String,
    },
    OWNER_NAME:{
        type:String,
        required:[true, error_Code_Enum.PHONE_NUMBER_OWNER_NAME_NOT_PRESENT.toString()],
    },
    OWNER_STATE:String,
    OWNER_COUNTRY_CODE:String,
    OWNER_PHONE_id:{
        type:String,
        unique:true,
    },
    OWNER_PHONE:{
        type:Number,
        min:[7000000000, error_Code_Enum.PHONE_NUMBER_INVALID.toString()],
        max:[9999999999, error_Code_Enum.PHONE_NUMBER_INVALID.toString()],
        required: [true, error_Code_Enum.PHONE_NUMBER_NOT_PRESENT.toString()],
    },
});

const dirEntryModel = mongoose.model("directory", dirEntrySchema);

export {
    dirEntryModel,
    IDirEntry
};