import { error_Code_Enum } from "../constants/error-codes";
import { IDirEntry, IDirUser } from "../db/Models";
import { isPasswordValid } from "./helpers";
import { Request, Response, NextFunction } from "express";

function validateEmail(doc:any[]) {
    if(!doc)
        throw new Error(error_Code_Enum.ID_OR_EMAIL_NOT_FOUND_IN_RECORDS.toString());
}

function validatePassword(body:IDirUser, doc:any) {
    let userRecord = doc;
    if(!isPasswordValid(body.PASSWORD, userRecord.USER_HASHED_PASSWORD))
        throw new Error(error_Code_Enum.INVALID_LOGIN_PASSWORD.toString());
}

/*
* validatorError: throws validator error, if any
* */
export function validatorError(doc:any, body:IDirUser, req?:Request) {
    let loginUrlRegex = /[\/]login/;

    validateEmail(doc);
    /*test for password only if its login route*/
    if(loginUrlRegex.test(req.url)) validatePassword(body, doc);
}