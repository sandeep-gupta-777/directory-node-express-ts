
import { error_Code_Enum } from "../../constants/error-codes";
import { dirUserModel, dirEntryModel } from "../Models";
import { getValue } from "../../helpers";

/**
 * documentValidatorErrors: this method will return custom errors
 * */
function documentValidatorErrors(err: any, model:any) {

    //extract error code from error message //TODO: implement it cleanly
    let documentErrorStr: string = getValue(err, "message");
    let documentErrorCode: string = documentErrorStr ?
        documentErrorStr.split(":")[documentErrorStr.split(":").length - 1].trim() : undefined;//TODO: improve this

    if (err && err.name === "MongoError") {
        if (err.code === 11000 || err.code === 11001 ) {//todo: implement this section better
            if(model === dirUserModel && documentErrorStr.includes('USER_EMAIL')){
                return new Error(error_Code_Enum.DIRECTORY_USER_EMAIL_ALREADY_REGISTERED.toString());
            }
            if(model === dirEntryModel && documentErrorStr.includes('OWNER_PHONE')){
                return new Error(error_Code_Enum.PHONE_NUMBER_ALREADY_EXISTS_IN_DIRECTORY.toString());
            }
        }
        return new Error(error_Code_Enum.DB_CANNOT_ACCESS_DB.toString());
    }
    if(err && err.name === "CastError"){
        return new Error(error_Code_Enum.DB_CASTERROR_PROBLEM_WITH_ID_OR_SUCH.toString());
    }

    if (documentErrorCode) {
        return new Error(documentErrorCode);
    }
    return new Error(error_Code_Enum.UNRECOGNISED_VALIDATION_ERROR.toString());
}

export {
    documentValidatorErrors
};