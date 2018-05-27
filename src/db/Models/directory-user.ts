import mongoose from "mongoose";
import { error_Code_Enum } from "../../constants/error-codes";
const beautifyUnique = require('mongoose-beautiful-unique-validation');

/*TODO:
1. add proper validation in schema
2. make schema according to profile database
3. replace mixed types with appropriate type
* */

export interface IDirUser{
    _id?:string,
    USER_FIRST_NAME?:string,
    USER_EMAIL?:string,
    USER_HASHED_PASSWORD?:string,
    USER_ROLE?:string,
    PASSWORD?:string//this will not be saved in DB
    NEW_PASSWORD?:string//this will not be saved in DB
}

const dirUserSchema = new mongoose.Schema({
    USER_FIRST_NAME:{
        type:String,
    },
    USER_EMAIL:{
        type:String,
        required: [true, error_Code_Enum.DIRECTORY_USER_EMAIL_NOT_PRESENT.toString()],
        unique:true,
        /*
        * Regex credits:
        * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        * */
        validate: [/\S+@\S+\.\S+/, error_Code_Enum.DIRECTORY_USER_EMAIL_FORMAT_INCORRECT.toString()],

    },
    USER_HASHED_PASSWORD:{
        type:String,
        required: [true, error_Code_Enum.DIRECTORY_USER_PASSWORD_NOT_PRESENT.toString()],
    },
    USER_ROLE:String,
});

// Enable beautifying on this schema
// dirUserSchema.plugin(beautifyUnique);
export const dirUserModel = mongoose.model("directory-user", dirUserSchema);

